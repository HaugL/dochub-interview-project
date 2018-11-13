import React from 'react';
import { Provider } from 'react-redux';
import { createTestStore } from '../utils/store'
import { mount } from 'enzyme';
import * as API from '../utils/API'

export function mountComponentWithStore(component, config = {}){
  const store = createTestStore()
  const wrapper = mount(
    <Provider store={store}>
      { component }
    </Provider>
  )

  return { store, wrapper }
}

export function mockAPI(collection, mocks){
  collection.stub(API, 'requestAPI').callsFake((config) => {
    const url = config.url
    if(mocks[url]){
      config.success(mocks[url](config))
    }
  })
}
