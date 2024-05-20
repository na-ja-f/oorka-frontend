import{r as p,T as _}from"./index-DCRuhw0B.js";var v={exports:{}},R={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E;function D(){if(E)return R;E=1;var n=_,l=Symbol.for("react.element"),d=Symbol.for("react.fragment"),f=Object.prototype.hasOwnProperty,s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,u={key:!0,ref:!0,__self:!0,__source:!0};function h(r,a,c){var e,t={},i=null,m=null;c!==void 0&&(i=""+c),a.key!==void 0&&(i=""+a.key),a.ref!==void 0&&(m=a.ref);for(e in a)f.call(a,e)&&!u.hasOwnProperty(e)&&(t[e]=a[e]);if(r&&r.defaultProps)for(e in a=r.defaultProps,a)t[e]===void 0&&(t[e]=a[e]);return{$$typeof:l,type:r,key:i,ref:m,props:t,_owner:s.current}}return R.Fragment=d,R.jsx=h,R.jsxs=h,R}v.exports=D();var y=v.exports;const T=(n,l,d,f)=>{let s=l/(d+f),u=Math.floor(n.length/s);s>n.length&&(s=n.length,u=1);const h=[];for(let r=0;r<s;r++){let a=0;for(let c=0;c<u&&r*u+c<n.length;c++)a+=n[r*u+c];h.push(a/u)}return h},A=(n,l,d,f,s,u)=>{const h=l.height/2,r=l.getContext("2d");r&&(r.clearRect(0,0,l.width,l.height),s!=="transparent"&&(r.fillStyle=s,r.fillRect(0,0,l.width,l.height)),n.forEach((a,c)=>{r.fillStyle=u;const e=c*(d+f),t=h-a/2,i=d,m=a||1;r.beginPath(),r.roundRect?(r.roundRect(e,t,i,m,50),r.fill()):r.fillRect(e,t,i,m)}))},P=({mediaRecorder:n,width:l="100%",height:d="100%",barWidth:f=2,gap:s=1,backgroundColor:u="transparent",barColor:h="rgb(160, 198, 255)",fftSize:r=1024,maxDecibels:a=-10,minDecibels:c=-90,smoothingTimeConstant:e=.4})=>{const[t]=p.useState(()=>new AudioContext),[i,m]=p.useState(),b=p.useRef(null);p.useEffect(()=>{if(!n.stream)return;const o=t.createAnalyser();m(o),o.fftSize=r,o.minDecibels=c,o.maxDecibels=a,o.smoothingTimeConstant=e,t.createMediaStreamSource(n.stream).connect(o)},[n.stream]),p.useEffect(()=>{i&&n.state==="recording"&&w()},[i,n.state]);const w=p.useCallback(()=>{if(!i)return;const o=new Uint8Array(i==null?void 0:i.frequencyBinCount);n.state==="recording"?(i==null||i.getByteFrequencyData(o),C(o),requestAnimationFrame(w)):n.state==="paused"?C(o):n.state==="inactive"&&t.state!=="closed"&&t.close()},[i,t.state]),C=o=>{if(!b.current)return;const g=T(o,b.current.width,f,s);A(g,b.current,f,s,u,h)};return y.jsx("canvas",{ref:b,width:l,height:d,style:{aspectRatio:"unset"}})},k=(n,l,d,f,s)=>{const u=n.getChannelData(0),h=d/(f+s),r=Math.floor(u.length/h),a=l/2;let c=[],e=0;for(let t=0;t<h;t++){const i=[];let m=0;const b=[];let w=0;for(let g=0;g<r&&t*r+g<n.length;g++){const x=u[t*r+g];x<=0&&(i.push(x),m++),x>0&&(b.push(x),w++)}const C=i.reduce((g,x)=>g+x,0)/m,o={max:b.reduce((g,x)=>g+x,0)/w,min:C};o.max>e&&(e=o.max),Math.abs(o.min)>e&&(e=Math.abs(o.min)),c.push(o)}if(a*.8>e*a){const t=a*.8/e;c=c.map(i=>({max:i.max*t,min:i.min*t}))}return c},S=(n,l,d,f,s,u,h,r=0,a=1)=>{const c=l.height/2,e=l.getContext("2d");if(!e)return;e.clearRect(0,0,l.width,l.height),s!=="transparent"&&(e.fillStyle=s,e.fillRect(0,0,l.width,l.height));const t=(r||0)/a;n.forEach((i,m)=>{const b=m/n.length,w=t>b;e.fillStyle=w&&h?h:u;const C=m*(d+f),o=c+i.min,g=d,x=c+i.max-o;e.beginPath(),e.roundRect?(e.roundRect(C,o,g,x,50),e.fill()):e.fillRect(C,o,g,x)})},j=p.forwardRef(({blob:n,width:l,height:d,barWidth:f=2,gap:s=1,currentTime:u,style:h,backgroundColor:r="transparent",barColor:a="rgb(184, 184, 184)",barPlayedColor:c="rgb(160, 198, 255)"},e)=>{const t=p.useRef(null),[i,m]=p.useState([]),[b,w]=p.useState(0);return p.useImperativeHandle(e,()=>t.current,[]),p.useEffect(()=>{(async()=>{if(!t.current)return;if(!n){const o=Array.from({length:100},()=>({max:0,min:0}));S(o,t.current,f,s,r,a,c);return}const C=await n.arrayBuffer();await new AudioContext().decodeAudioData(C,o=>{if(!t.current)return;w(o.duration);const g=k(o,d,l,f,s);m(g),S(g,t.current,f,s,r,a,c)})})()},[n,t.current]),p.useEffect(()=>{t.current&&S(i,t.current,f,s,r,a,c,u,b)},[u,b]),y.jsx("canvas",{ref:t,width:l,height:d,style:{...h}})});j.displayName="AudioVisualizer";export{j as AudioVisualizer,P as LiveAudioVisualizer};
