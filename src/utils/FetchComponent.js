import React, { Component } from 'react';
import Immutable from 'immutable';

export default class FetchComponent extends Component {
  componentWillMount() {
    fetchComponentWillMount(this)
  }

  componentWillReceiveProps(nextProps) {
    fetchComponentWillReceiveProps(this, nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return fetchShouldComponentUpdate(this, nextProps, nextState)
  }

  render() {
    return fetchRender(this)
  }
}

export function fetchComponentWillMount(component) {
  component.fetchData(component.props, component.state);
}

export function fetchComponentWillReceiveProps(component, nextProps) {
  if (!isEq(component.props, nextProps)) {
    component.fetchData(nextProps);
  }
}

export function fetchShouldComponentUpdate(component, nextProps, nextState) {
  return !isEq(component.props, nextProps) || !isEq(component.state, nextState);
}

export function fetchRender(component) {
  return <component.WrappedComponent { ...component.props } />;
}


export function isEq(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if (!objA || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const hasOwn = Object.prototype.hasOwnProperty;
  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !listIsEq(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }


  return true;
}

export function listIsEq(list1, list2) {
  if (list1 === list2) {
    return true;
  }

  if (Immutable.Iterable.isIndexed(list1)) {
    if(Immutable.Iterable.isIndexed(list2)){
      const size = list1.size;
      if (list2.size !== size) {
        return false;
      }
      return list2.isSubset(list1)
    }
  }
  else if(list1 instanceof Immutable.Map){
    return list1.equals(list2)
  }

  return false;
}
