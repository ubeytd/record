
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  const require = (await import("node:module")).createRequire(import.meta.url);
  const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
  const __dirname = (await import("node:path")).dirname(__filename);
  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.3.0";
var ot=Object.defineProperty;var K=(t,e)=>()=>(t&&(e=t(t=0)),e);var at=(t,e)=>{for(var s in e)ot(t,s,{get:e[s],enumerable:!0})};function pt(t,e){return(e?/^[\x00-\xFF]*$/:/^[\x00-\x7F]*$/).test(t)}function X(t,e=!1){let s=[],i=0;for(;i<t.length;){let h=t[i],u=function(n){if(!e)throw new TypeError(n);s.push({type:"INVALID_CHAR",index:i,value:t[i++]})};if(h==="*"){s.push({type:"ASTERISK",index:i,value:t[i++]});continue}if(h==="+"||h==="?"){s.push({type:"OTHER_MODIFIER",index:i,value:t[i++]});continue}if(h==="\\"){s.push({type:"ESCAPED_CHAR",index:i++,value:t[i++]});continue}if(h==="{"){s.push({type:"OPEN",index:i,value:t[i++]});continue}if(h==="}"){s.push({type:"CLOSE",index:i,value:t[i++]});continue}if(h===":"){let n="",r=i+1;for(;r<t.length;){let a=t.substr(r,1);if(r===i+1&&ht.test(a)||r!==i+1&&ut.test(a)){n+=t[r++];continue}break}if(!n){u(`Missing parameter name at ${i}`);continue}s.push({type:"NAME",index:i,value:n}),i=r;continue}if(h==="("){let n=1,r="",a=i+1,o=!1;if(t[a]==="?"){u(`Pattern cannot start with "?" at ${a}`);continue}for(;a<t.length;){if(!pt(t[a],!1)){u(`Invalid character '${t[a]}' at ${a}.`),o=!0;break}if(t[a]==="\\"){r+=t[a++]+t[a++];continue}if(t[a]===")"){if(n--,n===0){a++;break}}else if(t[a]==="("&&(n++,t[a+1]!=="?")){u(`Capturing groups are not allowed at ${a}`),o=!0;break}r+=t[a++]}if(o)continue;if(n){u(`Unbalanced pattern at ${i}`);continue}if(!r){u(`Missing pattern at ${i}`);continue}s.push({type:"REGEX",index:i,value:r}),i=a;continue}s.push({type:"CHAR",index:i,value:t[i++]})}return s.push({type:"END",index:i,value:""}),s}function V(t,e={}){let s=X(t);e.delimiter??="/#?",e.prefixes??="./";let i=`[^${d(e.delimiter)}]+?`,h=[],u=0,n=0,r="",a=new Set,o=p=>{if(n<s.length&&s[n].type===p)return s[n++].value},c=()=>o("OTHER_MODIFIER")??o("ASTERISK"),y=p=>{let l=o(p);if(l!==void 0)return l;let{type:f,index:R}=s[n];throw new TypeError(`Unexpected ${f} at ${R}, expected ${p}`)},$=()=>{let p="",l;for(;l=o("CHAR")??o("ESCAPED_CHAR");)p+=l;return p},nt=p=>p,A=e.encodePart||nt,P="",S=p=>{P+=p},I=()=>{P.length&&(h.push(new U(3,"","",A(P),"",3)),P="")},M=(p,l,f,R,b)=>{let g=3;switch(b){case"?":g=1;break;case"*":g=0;break;case"+":g=2;break}if(!l&&!f&&g===3){S(p);return}if(I(),!l&&!f){if(!p)return;h.push(new U(3,"","",A(p),"",g));return}let m;f?f==="*"?m=_:m=f:m=i;let C=2;m===i?(C=1,m=""):m===_&&(C=0,m="");let x;if(l?x=l:f&&(x=u++),a.has(x))throw new TypeError(`Duplicate name '${x}'.`);a.add(x),h.push(new U(C,x,A(p),m,A(R),g))};for(;n<s.length;){let p=o("CHAR"),l=o("NAME"),f=o("REGEX");if(!l&&!f&&(f=o("ASTERISK")),l||f){let b=p??"";e.prefixes.indexOf(b)===-1&&(S(b),b=""),I();let g=c();M(b,l,f,"",g);continue}let R=p??o("ESCAPED_CHAR");if(R){S(R);continue}if(o("OPEN")){let b=$(),g=o("NAME"),m=o("REGEX");!g&&!m&&(m=o("ASTERISK"));let C=$();y("CLOSE");let x=c();M(b,g,m,C,x);continue}I(),y("END")}return h}function d(t){return t.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}function W(t){return t&&t.ignoreCase?"ui":"u"}function lt(t,e,s){return z(V(t,s),e,s)}function T(t){switch(t){case 0:return"*";case 1:return"?";case 2:return"+";case 3:return""}}function z(t,e,s={}){s.delimiter??="/#?",s.prefixes??="./",s.sensitive??=!1,s.strict??=!1,s.end??=!0,s.start??=!0,s.endsWith="";let i=s.start?"^":"";for(let r of t){if(r.type===3){r.modifier===3?i+=d(r.value):i+=`(?:${d(r.value)})${T(r.modifier)}`;continue}e&&e.push(r.name);let a=`[^${d(s.delimiter)}]+?`,o=r.value;if(r.type===1?o=a:r.type===0&&(o=_),!r.prefix.length&&!r.suffix.length){r.modifier===3||r.modifier===1?i+=`(${o})${T(r.modifier)}`:i+=`((?:${o})${T(r.modifier)})`;continue}if(r.modifier===3||r.modifier===1){i+=`(?:${d(r.prefix)}(${o})${d(r.suffix)})`,i+=T(r.modifier);continue}i+=`(?:${d(r.prefix)}`,i+=`((?:${o})(?:`,i+=d(r.suffix),i+=d(r.prefix),i+=`(?:${o}))*)${d(r.suffix)})`,r.modifier===0&&(i+="?")}let h=`[${d(s.endsWith)}]|$`,u=`[${d(s.delimiter)}]`;if(s.end)return s.strict||(i+=`${u}?`),s.endsWith.length?i+=`(?=${h})`:i+="$",new RegExp(i,W(s));s.strict||(i+=`(?:${u}(?=${h}))?`);let n=!1;if(t.length){let r=t[t.length-1];r.type===3&&r.modifier===3&&(n=s.delimiter.indexOf(r)>-1)}return n||(i+=`(?=${u}|${h})`),new RegExp(i,W(s))}function mt(t,e){return t.length?t[0]==="/"?!0:!e||t.length<2?!1:(t[0]=="\\"||t[0]=="{")&&t[1]=="/":!1}function Z(t,e){return t.startsWith(e)?t.substring(e.length,t.length):t}function dt(t,e){return t.endsWith(e)?t.substr(0,t.length-e.length):t}function q(t){return!t||t.length<2?!1:t[0]==="["||(t[0]==="\\"||t[0]==="{")&&t[1]==="["}function J(t){if(!t)return!0;for(let e of B)if(t.test(e))return!0;return!1}function gt(t,e){if(t=Z(t,"#"),e||t==="")return t;let s=new URL("https://example.com");return s.hash=t,s.hash?s.hash.substring(1,s.hash.length):""}function yt(t,e){if(t=Z(t,"?"),e||t==="")return t;let s=new URL("https://example.com");return s.search=t,s.search?s.search.substring(1,s.search.length):""}function wt(t,e){return e||t===""?t:q(t)?tt(t):Y(t)}function bt(t,e){if(e||t==="")return t;let s=new URL("https://example.com");return s.password=t,s.password}function xt(t,e){if(e||t==="")return t;let s=new URL("https://example.com");return s.username=t,s.username}function vt(t,e,s){if(s||t==="")return t;if(e&&!B.includes(e))return new URL(`${e}:${t}`).pathname;let i=t[0]=="/";return t=new URL(i?t:"/-"+t,"https://example.com").pathname,i||(t=t.substring(2,t.length)),t}function Et(t,e,s){return Q(e)===t&&(t=""),s||t===""?t:et(t)}function $t(t,e){return t=dt(t,":"),e||t===""?t:D(t)}function Q(t){switch(t){case"ws":case"http":return"80";case"wws":case"https":return"443";case"ftp":return"21";default:return""}}function D(t){if(t==="")return t;if(/^[-+.A-Za-z0-9]*$/.test(t))return t.toLowerCase();throw new TypeError(`Invalid protocol '${t}'.`)}function Rt(t){if(t==="")return t;let e=new URL("https://example.com");return e.username=t,e.username}function Tt(t){if(t==="")return t;let e=new URL("https://example.com");return e.password=t,e.password}function Y(t){if(t==="")return t;if(/[\t\n\r #%/:<>?@[\]^\\|]/g.test(t))throw new TypeError(`Invalid hostname '${t}'`);let e=new URL("https://example.com");return e.hostname=t,e.hostname}function tt(t){if(t==="")return t;if(/[^0-9a-fA-F[\]:]/g.test(t))throw new TypeError(`Invalid IPv6 hostname '${t}'`);return t.toLowerCase()}function et(t){if(t===""||/^[0-9]*$/.test(t)&&parseInt(t)<=65535)return t;throw new TypeError(`Invalid port '${t}'.`)}function Ct(t){if(t==="")return t;let e=new URL("https://example.com");return e.pathname=t[0]!=="/"?"/-"+t:t,t[0]!=="/"?e.pathname.substring(2,e.pathname.length):e.pathname}function kt(t){return t===""?t:new URL(`data:${t}`).pathname}function Lt(t){if(t==="")return t;let e=new URL("https://example.com");return e.search=t,e.search.substring(1,e.search.length)}function Ut(t){if(t==="")return t;let e=new URL("https://example.com");return e.hash=t,e.hash.substring(1,e.hash.length)}function G(t,e){if(typeof t!="string")throw new TypeError("parameter 1 is not of type 'string'.");let s=new URL(t,e);return{protocol:s.protocol.substring(0,s.protocol.length-1),username:s.username,password:s.password,hostname:s.hostname,port:s.port,pathname:s.pathname,search:s.search!==""?s.search.substring(1,s.search.length):void 0,hash:s.hash!==""?s.hash.substring(1,s.hash.length):void 0}}function w(t,e){return e?L(t):t}function k(t,e,s){let i;if(typeof e.baseURL=="string")try{i=new URL(e.baseURL),e.protocol===void 0&&(t.protocol=w(i.protocol.substring(0,i.protocol.length-1),s)),!s&&e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&e.username===void 0&&(t.username=w(i.username,s)),!s&&e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&e.username===void 0&&e.password===void 0&&(t.password=w(i.password,s)),e.protocol===void 0&&e.hostname===void 0&&(t.hostname=w(i.hostname,s)),e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&(t.port=w(i.port,s)),e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&e.pathname===void 0&&(t.pathname=w(i.pathname,s)),e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&e.pathname===void 0&&e.search===void 0&&(t.search=w(i.search.substring(1,i.search.length),s)),e.protocol===void 0&&e.hostname===void 0&&e.port===void 0&&e.pathname===void 0&&e.search===void 0&&e.hash===void 0&&(t.hash=w(i.hash.substring(1,i.hash.length),s))}catch{throw new TypeError(`invalid baseURL '${e.baseURL}'.`)}if(typeof e.protocol=="string"&&(t.protocol=$t(e.protocol,s)),typeof e.username=="string"&&(t.username=xt(e.username,s)),typeof e.password=="string"&&(t.password=bt(e.password,s)),typeof e.hostname=="string"&&(t.hostname=wt(e.hostname,s)),typeof e.port=="string"&&(t.port=Et(e.port,t.protocol,s)),typeof e.pathname=="string"){if(t.pathname=e.pathname,i&&!mt(t.pathname,s)){let h=i.pathname.lastIndexOf("/");h>=0&&(t.pathname=w(i.pathname.substring(0,h+1),s)+t.pathname)}t.pathname=vt(t.pathname,t.protocol,s)}return typeof e.search=="string"&&(t.search=yt(e.search,s)),typeof e.hash=="string"&&(t.hash=gt(e.hash,s)),t}function L(t){return t.replace(/([+*?:{}()\\])/g,"\\$1")}function Pt(t){return t.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}function St(t,e){e.delimiter??="/#?",e.prefixes??="./",e.sensitive??=!1,e.strict??=!1,e.end??=!0,e.start??=!0,e.endsWith="";let s=".*",i=`[^${Pt(e.delimiter)}]+?`,h=/[$_\u200C\u200D\p{ID_Continue}]/u,u="";for(let n=0;n<t.length;++n){let r=t[n];if(r.type===3){if(r.modifier===3){u+=L(r.value);continue}u+=`{${L(r.value)}}${T(r.modifier)}`;continue}let a=r.hasCustomName(),o=!!r.suffix.length||!!r.prefix.length&&(r.prefix.length!==1||!e.prefixes.includes(r.prefix)),c=n>0?t[n-1]:null,y=n<t.length-1?t[n+1]:null;if(!o&&a&&r.type===1&&r.modifier===3&&y&&!y.prefix.length&&!y.suffix.length)if(y.type===3){let $=y.value.length>0?y.value[0]:"";o=h.test($)}else o=!y.hasCustomName();if(!o&&!r.prefix.length&&c&&c.type===3){let $=c.value[c.value.length-1];o=e.prefixes.includes($)}o&&(u+="{"),u+=L(r.prefix),a&&(u+=`:${r.name}`),r.type===2?u+=`(${r.value})`:r.type===1?a||(u+=`(${i})`):r.type===0&&(!a&&(!c||c.type===3||c.modifier!==3||o||r.prefix!=="")?u+="*":u+=`(${s})`),r.type===1&&a&&r.suffix.length&&h.test(r.suffix[0])&&(u+="\\"),u+=L(r.suffix),o&&(u+="}"),r.modifier!==3&&(u+=T(r.modifier))}return u}var U,ht,ut,_,E,ct,ft,B,At,O,v,N,st=K(()=>{U=class{type=3;name="";prefix="";value="";suffix="";modifier=3;constructor(t,e,s,i,h,u){this.type=t,this.name=e,this.prefix=s,this.value=i,this.suffix=h,this.modifier=u}hasCustomName(){return this.name!==""&&typeof this.name!="number"}},ht=/[$_\p{ID_Start}]/u,ut=/[$_\u200C\u200D\p{ID_Continue}]/u,_=".*";E={delimiter:"",prefixes:"",sensitive:!0,strict:!0},ct={delimiter:".",prefixes:"",sensitive:!0,strict:!0},ft={delimiter:"/",prefixes:"/",sensitive:!0,strict:!0};B=["ftp","file","http","https","ws","wss"];At=class{#n;#r=[];#e={};#t=0;#i=1;#u=0;#a=0;#f=0;#m=0;#d=!1;constructor(t){this.#n=t}get result(){return this.#e}parse(){for(this.#r=X(this.#n,!0);this.#t<this.#r.length;this.#t+=this.#i){if(this.#i=1,this.#r[this.#t].type==="END"){if(this.#a===0){this.#b(),this.#p()?this.#s(9,1):this.#l()?this.#s(8,1):this.#s(7,0);continue}else if(this.#a===2){this.#c(5);continue}this.#s(10,0);break}if(this.#f>0)if(this.#C())this.#f-=1;else continue;if(this.#T()){this.#f+=1;continue}switch(this.#a){case 0:this.#x()&&this.#c(1);break;case 1:if(this.#x()){this.#U();let t=7,e=1;this.#E()?(t=2,e=3):this.#d&&(t=2),this.#s(t,e)}break;case 2:this.#y()?this.#c(3):(this.#w()||this.#l()||this.#p())&&this.#c(5);break;case 3:this.#$()?this.#s(4,1):this.#y()&&this.#s(5,1);break;case 4:this.#y()&&this.#s(5,1);break;case 5:this.#k()?this.#m+=1:this.#L()&&(this.#m-=1),this.#R()&&!this.#m?this.#s(6,1):this.#w()?this.#s(7,0):this.#l()?this.#s(8,1):this.#p()&&this.#s(9,1);break;case 6:this.#w()?this.#s(7,0):this.#l()?this.#s(8,1):this.#p()&&this.#s(9,1);break;case 7:this.#l()?this.#s(8,1):this.#p()&&this.#s(9,1);break;case 8:this.#p()&&this.#s(9,1);break;case 9:break;case 10:break}}this.#e.hostname!==void 0&&this.#e.port===void 0&&(this.#e.port="")}#s(t,e){switch(this.#a){case 0:break;case 1:this.#e.protocol=this.#h();break;case 2:break;case 3:this.#e.username=this.#h();break;case 4:this.#e.password=this.#h();break;case 5:this.#e.hostname=this.#h();break;case 6:this.#e.port=this.#h();break;case 7:this.#e.pathname=this.#h();break;case 8:this.#e.search=this.#h();break;case 9:this.#e.hash=this.#h();break;case 10:break}this.#a!==0&&t!==10&&([1,2,3,4].includes(this.#a)&&[6,7,8,9].includes(t)&&(this.#e.hostname??=""),[1,2,3,4,5,6].includes(this.#a)&&[8,9].includes(t)&&(this.#e.pathname??=this.#d?"/":""),[1,2,3,4,5,6,7].includes(this.#a)&&t===9&&(this.#e.search??="")),this.#v(t,e)}#v(t,e){this.#a=t,this.#u=this.#t+e,this.#t+=e,this.#i=0}#b(){this.#t=this.#u,this.#i=0}#c(t){this.#b(),this.#a=t}#g(t){return t<0&&(t=this.#r.length-t),t<this.#r.length?this.#r[t]:this.#r[this.#r.length-1]}#o(t,e){let s=this.#g(t);return s.value===e&&(s.type==="CHAR"||s.type==="ESCAPED_CHAR"||s.type==="INVALID_CHAR")}#x(){return this.#o(this.#t,":")}#E(){return this.#o(this.#t+1,"/")&&this.#o(this.#t+2,"/")}#y(){return this.#o(this.#t,"@")}#$(){return this.#o(this.#t,":")}#R(){return this.#o(this.#t,":")}#w(){return this.#o(this.#t,"/")}#l(){if(this.#o(this.#t,"?"))return!0;if(this.#r[this.#t].value!=="?")return!1;let t=this.#g(this.#t-1);return t.type!=="NAME"&&t.type!=="REGEX"&&t.type!=="CLOSE"&&t.type!=="ASTERISK"}#p(){return this.#o(this.#t,"#")}#T(){return this.#r[this.#t].type=="OPEN"}#C(){return this.#r[this.#t].type=="CLOSE"}#k(){return this.#o(this.#t,"[")}#L(){return this.#o(this.#t,"]")}#h(){let t=this.#r[this.#t],e=this.#g(this.#u).index;return this.#n.substring(e,t.index)}#U(){let t={};Object.assign(t,E),t.encodePart=D;let e=lt(this.#h(),void 0,t);this.#d=J(e)}},O=["protocol","username","password","hostname","port","pathname","search","hash"],v="*";N=class{#n;#r={};#e={};#t={};#i={};#u=!1;constructor(t={},e,s){try{let i;if(typeof e=="string"?i=e:s=e,typeof t=="string"){let r=new At(t);if(r.parse(),t=r.result,i===void 0&&typeof t.protocol!="string")throw new TypeError("A base URL must be provided for a relative constructor string.");t.baseURL=i}else{if(!t||typeof t!="object")throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");if(i)throw new TypeError("parameter 1 is not of type 'string'.")}typeof s>"u"&&(s={ignoreCase:!1});let h={ignoreCase:s.ignoreCase===!0},u={pathname:v,protocol:v,username:v,password:v,hostname:v,port:v,search:v,hash:v};this.#n=k(u,t,!0),Q(this.#n.protocol)===this.#n.port&&(this.#n.port="");let n;for(n of O){if(!(n in this.#n))continue;let r={},a=this.#n[n];switch(this.#e[n]=[],n){case"protocol":Object.assign(r,E),r.encodePart=D;break;case"username":Object.assign(r,E),r.encodePart=Rt;break;case"password":Object.assign(r,E),r.encodePart=Tt;break;case"hostname":Object.assign(r,ct),q(a)?r.encodePart=tt:r.encodePart=Y;break;case"port":Object.assign(r,E),r.encodePart=et;break;case"pathname":J(this.#r.protocol)?(Object.assign(r,ft,h),r.encodePart=Ct):(Object.assign(r,E,h),r.encodePart=kt);break;case"search":Object.assign(r,E,h),r.encodePart=Lt;break;case"hash":Object.assign(r,E,h),r.encodePart=Ut;break}try{this.#i[n]=V(a,r),this.#r[n]=z(this.#i[n],this.#e[n],r),this.#t[n]=St(this.#i[n],r),this.#u=this.#u||this.#i[n].some(o=>o.type===2)}catch{throw new TypeError(`invalid ${n} pattern '${this.#n[n]}'.`)}}}catch(i){throw new TypeError(`Failed to construct 'URLPattern': ${i.message}`)}}test(t={},e){let s={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof t!="string"&&e)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof t>"u")return!1;try{typeof t=="object"?s=k(s,t,!1):s=k(s,G(t,e),!1)}catch{return!1}let i;for(i of O)if(!this.#r[i].exec(s[i]))return!1;return!0}exec(t={},e){let s={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof t!="string"&&e)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof t>"u")return;try{typeof t=="object"?s=k(s,t,!1):s=k(s,G(t,e),!1)}catch{return null}let i={};e?i.inputs=[t,e]:i.inputs=[t];let h;for(h of O){let u=this.#r[h].exec(s[h]);if(!u)return null;let n={};for(let[r,a]of this.#e[h].entries())if(typeof a=="string"||typeof a=="number"){let o=u[r+1];n[a]=o}i[h]={input:s[h]??"",groups:n}}return i}static compareComponent(t,e,s){let i=(r,a)=>{for(let o of["type","modifier","prefix","value","suffix"]){if(r[o]<a[o])return-1;if(r[o]!==a[o])return 1}return 0},h=new U(3,"","","","",3),u=new U(0,"","","","",3),n=(r,a)=>{let o=0;for(;o<Math.min(r.length,a.length);++o){let c=i(r[o],a[o]);if(c)return c}return r.length===a.length?0:i(r[o]??h,a[o]??h)};return!e.#t[t]&&!s.#t[t]?0:e.#t[t]&&!s.#t[t]?n(e.#i[t],[u]):!e.#t[t]&&s.#t[t]?n([u],s.#i[t]):n(e.#i[t],s.#i[t])}get protocol(){return this.#t.protocol}get username(){return this.#t.username}get password(){return this.#t.password}get hostname(){return this.#t.hostname}get port(){return this.#t.port}get pathname(){return this.#t.pathname}get search(){return this.#t.search}get hash(){return this.#t.hash}get hasRegExpGroups(){return this.#u}}});var rt={};at(rt,{URLPattern:()=>N});var it=K(()=>{st();globalThis.URLPattern||(globalThis.URLPattern=N)});import"node:fs";import"node:path";import{webcrypto as F}from"node:crypto";globalThis._ENTRIES={};globalThis.self=globalThis;globalThis._ROUTES=[];function It(t){return typeof t>"u"||typeof t=="object"&&t.duplex===void 0?{duplex:"half",...t}:t}var j=class extends Request{constructor(e,s){super(e,It(s))}};globalThis.Request=j;globalThis.crypto||(globalThis.crypto=new F.Crypto);globalThis.CryptoKey||(globalThis.CryptoKey=F.CryptoKey);function H(){if(!(this instanceof H))return new H;throw TypeError("Illegal constructor")}globalThis.SubtleCrypto||(globalThis.SubtleCrypto=H);globalThis.Crypto||(globalThis.Crypto=F.Crypto);globalThis.URLPattern||await Promise.resolve().then(()=>(it(),rt));async function Ot(t){let e=new URL(t.url).pathname,i=globalThis._ROUTES.find(n=>n.regex.some(r=>new RegExp(r).test(e)));if(!i)throw new Error(`No route found for ${t.url}`);let h=await self._ENTRIES[`middleware_${i.name}`].default({page:i.page,request:{...t,page:{name:i.name}}});return await h.waitUntil,h.response}export{Ot as default};