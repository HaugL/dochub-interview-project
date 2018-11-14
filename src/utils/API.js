var request = require('request')

export function requestAPI({method, url, data, qs, success, failure}) {
  const keys = qs && Object.keys(qs)
  let queryString;
  if(keys && keys.length){
    queryString = '?'
    Object.keys(qs).forEach( (key, index) => {
      queryString += `${key}=${qs[key]}`

      if(index < keys.length -1){
        queryString += '&'
      }
    })
  }

  const params = {
    method,
    url: `${url}${queryString || ''}`,
    headers: {
      'Content-type': 'application/json',
      // 'Authorization': getSession(getState())
    }
  }

  if(data){
    params.body = JSON.stringify(data);
  }

  request(params, function (error, response, body) {
    if(error && error !== 'null'){
      console.log(error)
      failure({ ...error, status: response ? response.statusCode : 500 })
    } else if(response.statusCode && response.statusCode !== 200){
      let body;
      if(response.body && response.body !== 'null'){
        try {
          body = JSON.parse(response.body)
        } catch (e){}
      }

      failure({ message: (body && body.message) || response.statusMessage, status: response.statusCode })
    } else if(body && body !== 'null') {
      body = JSON.parse(body || "{}")
      if(body.error){
        failure(body.error)
      } else {
        success(body)
      }
    }
  })
}

export function getURLPrefix(){
  const currentUrl = window.location.href
  if(currentUrl.indexOf('localhost') > -1){
    return 'http://localhost:5000'
  } else if(currentUrl.indexOf('plum-web-staging') > -1){
    return 'https://plum-backend-staging.herokuapp.com'
  } else if(currentUrl.indexOf('plumrelish.com') > -1 || currentUrl.indexOf('plum-web-production') > -1){
    return 'https://plum-backend-production.herokuapp.com'
  } else {
    return ''
  }
}
