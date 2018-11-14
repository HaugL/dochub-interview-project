import request from 'then-jsonp'

export function requestAPI({method, url, qs, success, failure}) {
  request(method, url, { qs }, function (error, body) {
    if(error && error !== 'null'){
      failure({ ...error})
    } else if(body && body !== 'null') {
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
