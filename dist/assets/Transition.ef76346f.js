import{_ as C}from"./objectWithoutPropertiesLoose.2d2ba74a.js";import{_ as R}from"./inheritsLoose.5c0b15c1.js";import{p as n,R as b,ac as v,j as D}from"./index.c3bfd613.js";const S={disabled:!1};var k=n.exports.oneOfType([n.exports.number,n.exports.shape({enter:n.exports.number,exit:n.exports.number,appear:n.exports.number}).isRequired]),U=n.exports.oneOfType([n.exports.string,n.exports.shape({enter:n.exports.string,exit:n.exports.string,active:n.exports.string}),n.exports.shape({enter:n.exports.string,enterDone:n.exports.string,enterActive:n.exports.string,exit:n.exports.string,exitDone:n.exports.string,exitActive:n.exports.string})]);const N=b.createContext(null);var y=function(a){return a.scrollTop},m="unmounted",f="exited",x="entering",E="entered",T="exiting",u=function(l){R(a,l);function a(i,e){var t;t=l.call(this,i,e)||this;var r=e,o=r&&!r.isMounting?i.enter:i.appear,p;return t.appearStatus=null,i.in?o?(p=f,t.appearStatus=x):p=E:i.unmountOnExit||i.mountOnEnter?p=m:p=f,t.state={status:p},t.nextCallback=null,t}a.getDerivedStateFromProps=function(e,t){var r=e.in;return r&&t.status===m?{status:f}:null};var s=a.prototype;return s.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},s.componentDidUpdate=function(e){var t=null;if(e!==this.props){var r=this.state.status;this.props.in?r!==x&&r!==E&&(t=x):(r===x||r===E)&&(t=T)}this.updateStatus(!1,t)},s.componentWillUnmount=function(){this.cancelNextCallback()},s.getTimeouts=function(){var e=this.props.timeout,t,r,o;return t=r=o=e,e!=null&&typeof e!="number"&&(t=e.exit,r=e.enter,o=e.appear!==void 0?e.appear:r),{exit:t,enter:r,appear:o}},s.updateStatus=function(e,t){if(e===void 0&&(e=!1),t!==null)if(this.cancelNextCallback(),t===x){if(this.props.unmountOnExit||this.props.mountOnEnter){var r=this.props.nodeRef?this.props.nodeRef.current:v.findDOMNode(this);r&&y(r)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===f&&this.setState({status:m})},s.performEnter=function(e){var t=this,r=this.props.enter,o=this.context?this.context.isMounting:e,p=this.props.nodeRef?[o]:[v.findDOMNode(this),o],c=p[0],h=p[1],g=this.getTimeouts(),O=o?g.appear:g.enter;if(!e&&!r||S.disabled){this.safeSetState({status:E},function(){t.props.onEntered(c)});return}this.props.onEnter(c,h),this.safeSetState({status:x},function(){t.props.onEntering(c,h),t.onTransitionEnd(O,function(){t.safeSetState({status:E},function(){t.props.onEntered(c,h)})})})},s.performExit=function(){var e=this,t=this.props.exit,r=this.getTimeouts(),o=this.props.nodeRef?void 0:v.findDOMNode(this);if(!t||S.disabled){this.safeSetState({status:f},function(){e.props.onExited(o)});return}this.props.onExit(o),this.safeSetState({status:T},function(){e.props.onExiting(o),e.onTransitionEnd(r.exit,function(){e.safeSetState({status:f},function(){e.props.onExited(o)})})})},s.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},s.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},s.setNextCallback=function(e){var t=this,r=!0;return this.nextCallback=function(o){r&&(r=!1,t.nextCallback=null,e(o))},this.nextCallback.cancel=function(){r=!1},this.nextCallback},s.onTransitionEnd=function(e,t){this.setNextCallback(t);var r=this.props.nodeRef?this.props.nodeRef.current:v.findDOMNode(this),o=e==null&&!this.props.addEndListener;if(!r||o){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var p=this.props.nodeRef?[this.nextCallback]:[r,this.nextCallback],c=p[0],h=p[1];this.props.addEndListener(c,h)}e!=null&&setTimeout(this.nextCallback,e)},s.render=function(){var e=this.state.status;if(e===m)return null;var t=this.props,r=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var o=C(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return D(N.Provider,{value:null,children:typeof r=="function"?r(e,o):b.cloneElement(b.Children.only(r),o)})},a}(b.Component);u.contextType=N;u.propTypes={nodeRef:n.exports.shape({current:typeof Element>"u"?n.exports.any:function(l,a,s,i,e,t){var r=l[a];return n.exports.instanceOf(r&&"ownerDocument"in r?r.ownerDocument.defaultView.Element:Element)(l,a,s,i,e,t)}}),children:n.exports.oneOfType([n.exports.func.isRequired,n.exports.element.isRequired]).isRequired,in:n.exports.bool,mountOnEnter:n.exports.bool,unmountOnExit:n.exports.bool,appear:n.exports.bool,enter:n.exports.bool,exit:n.exports.bool,timeout:function(a){var s=k;a.addEndListener||(s=s.isRequired);for(var i=arguments.length,e=new Array(i>1?i-1:0),t=1;t<i;t++)e[t-1]=arguments[t];return s.apply(void 0,[a].concat(e))},addEndListener:n.exports.func,onEnter:n.exports.func,onEntering:n.exports.func,onEntered:n.exports.func,onExit:n.exports.func,onExiting:n.exports.func,onExited:n.exports.func};function d(){}u.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:d,onEntering:d,onEntered:d,onExit:d,onExiting:d,onExited:d};u.UNMOUNTED=m;u.EXITED=f;u.ENTERING=x;u.ENTERED=E;u.EXITING=T;const w=u;export{N as T,w as a,U as c,y as f};
