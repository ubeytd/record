(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1360:(e,t,a)=>{Promise.resolve().then(a.bind(a,9722)),Promise.resolve().then(a.bind(a,8026))},9722:(e,t,a)=>{"use strict";a.d(t,{GlobalPlayer:()=>f});var r=a(4568),s=a(7620),i=a(9526),n=a(6525),l=a(3106),o=a(226),d=a(7306),c=a(3312),u=a(8214),m=a(9773);let h=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsxs)(u.bL,{ref:t,className:(0,m.cn)("relative flex w-full touch-none select-none items-center",a),...s,children:[(0,r.jsx)(u.CC,{className:"relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",children:(0,r.jsx)(u.Q6,{className:"absolute h-full bg-primary"})}),(0,r.jsx)(u.zi,{className:"block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"})]})});function f(e){let{initialRecordingId:t,forceShow:a=!1}=e,{currentRecording:u,isPlaying:m,currentTime:f,duration:x,pause:p,resume:g,seek:b,clearCurrentRecording:w,setCurrentRecordingById:v}=(0,i.n)(),[N,j]=(0,s.useState)(0),[y,k]=(0,s.useState)(!1);if((0,s.useEffect)(()=>{t&&t!==(null==u?void 0:u.id)&&v(t)},[t,v,null==u?void 0:u.id]),(0,s.useEffect)(()=>{u&&x>0&&!y&&j(f/x*100)},[f,x,u,y]),!u&&!a)return null;let R=e=>{let t=Math.floor(e/60),a=Math.floor(e%60);return"".concat(t,":").concat(a.toString().padStart(2,"0"))};return(0,r.jsx)("div",{className:"fixed bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/[0.06] shadow-2xl shadow-black/20",children:(0,r.jsxs)("div",{className:"max-w-3xl mx-auto",children:[(0,r.jsx)("div",{className:"px-4 pt-3",children:(0,r.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[(0,r.jsx)("span",{className:"text-[11px] tabular-nums text-white/40 w-10",children:R(f)}),(0,r.jsx)(h,{value:[N],max:100,step:.1,className:"flex-1",onValueChange:e=>{void 0!==e[0]&&(j(e[0]),x&&b(e[0]/100*x))},onValueCommit:()=>k(!1),onPointerDown:()=>k(!0)}),(0,r.jsx)("span",{className:"text-[11px] tabular-nums text-white/40 w-10",children:R(x)})]})}),(0,r.jsxs)("div",{className:"flex items-center p-3 gap-4",children:[(0,r.jsx)(n.$,{variant:"ghost",size:"icon",className:"relative w-10 h-10 text-white hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95",onClick:()=>{m?p():u&&g()},disabled:!u,children:u?m?(0,r.jsx)(o.A,{className:"h-5 w-5"}):(0,r.jsx)(d.A,{className:"h-5 w-5 ml-0.5"}):(0,r.jsx)(l.A,{className:"h-5 w-5 animate-spin text-white/40"})}),(0,r.jsxs)("div",{className:"flex-1 min-w-0",children:[(0,r.jsx)("h3",{className:"text-[15px] font-medium truncate text-white/90",children:u?u.title||"Untitled Recording":"No recording selected"}),(0,r.jsx)("p",{className:"text-[13px] text-white/40 truncate",children:u?R(x):"Select a recording to play"})]}),u&&!a&&(0,r.jsx)(n.$,{variant:"ghost",size:"icon",className:"text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95",onClick:w,children:(0,r.jsx)(c.A,{className:"h-4 w-4"})})]})]})})}h.displayName=u.bL.displayName},8026:(e,t,a)=>{"use strict";a.d(t,{RecordingsList:()=>ea});var r=a(4568),s=a(7620),i=a(9192),n=a(3686),l=a(3312),o=a(9773);let d=i.bL;i.l9,i.bm;let c=i.ZL,u=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(i.hJ,{className:(0,o.cn)("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s,ref:t})});u.displayName=i.hJ.displayName;let m=(0,n.F)("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",{variants:{side:{top:"inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",bottom:"inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",left:"inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",right:"inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"}},defaultVariants:{side:"right"}}),h=s.forwardRef((e,t)=>{let{side:a="right",className:s,children:n,...d}=e;return(0,r.jsxs)(c,{children:[(0,r.jsx)(u,{}),(0,r.jsxs)(i.UC,{ref:t,className:(0,o.cn)(m({side:a}),s),...d,children:[(0,r.jsxs)(i.bm,{className:"absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",children:[(0,r.jsx)(l.A,{className:"h-4 w-4"}),(0,r.jsx)("span",{className:"sr-only",children:"Close"})]}),n]})]})});function f(e){let{isRecording:t,audioStream:a,color:i="#FFFFFF"}=e,n=(0,s.useRef)(null),l=(0,s.useRef)(),o=(0,s.useRef)(),d=(0,s.useRef)(),c=(0,s.useRef)([]);return(0,s.useEffect)(()=>{if(!t||!a||!n.current)return;let e=new(window.AudioContext||window.webkitAudioContext),r=e.createAnalyser(),s=e.createMediaStreamSource(a);r.fftSize=1024,r.smoothingTimeConstant=.85,s.connect(r);let u=r.frequencyBinCount,m=new Uint8Array(u);o.current=r,d.current=m;let h=n.current,f=h.getContext("2d");0===c.current.length&&(c.current=Array(u).fill(128));let x=()=>{if(!t||!o.current||!d.current||!c.current)return;let e=h.width,a=h.height,r=a/2,s=d.current,n=c.current;o.current.getByteTimeDomainData(s),f.clearRect(0,0,e,a),f.lineWidth=2,f.strokeStyle=i,f.beginPath();let m=Math.floor(u/100);for(let t=0;t<100;t++){let i=t*m,l=t/100*e,o=s[i]||128,d=n[t]||128;n[t]=.7*d+.3*o;let c=r+a/3*((n[t]-128)/128);if(0===t)f.moveTo(l,c);else{let s=(t-1)/100*e,i=r+(n[t-1]-128)/128*(a/3),o=(l+s)/2;f.quadraticCurveTo(o,i,l,c)}}f.stroke(),l.current=requestAnimationFrame(x)};return x(),()=>{l.current&&cancelAnimationFrame(l.current),e.close()}},[t,a,i]),(0,r.jsx)("canvas",{ref:n,className:"w-full h-full",width:800,height:128,style:{background:"transparent"}})}h.displayName=i.UC.displayName,s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(i.hE,{ref:t,className:(0,o.cn)("text-lg font-semibold text-foreground",a),...s})}).displayName=i.hE.displayName,s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(i.VY,{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",a),...s})}).displayName=i.VY.displayName;var x=a(6525),p=a(3106),g=a(6023),b=a(6541);let w=(0,b.createServerReference)("7f8301e056c2c51d9099ede587f6773f1ac0c100e2",b.callServer,void 0,b.findSourceMapURL,"uploadRecording");var v=a(2651);function N(e){let{isOpen:t,onOpenChange:a,onComplete:i}=e,[n,o]=(0,s.useState)(!1),[c,u]=(0,s.useState)(0),[m,b]=(0,s.useState)("New Recording"),[N,j]=(0,s.useTransition)(),[y,k]=(0,s.useState)(),[R,C]=(0,s.useState)(),[S,z]=(0,s.useState)([]),[I,E]=(0,s.useState)(!1),[A,F]=(0,s.useState)(0),M=(0,v.createBrowserClient)("https://ceczcbdetftwjybhvhlv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY3pjYmRldGZ0d2p5Ymh2aGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzg5MjIsImV4cCI6MjA1MTgxNDkyMn0.YGLZniICb_Kj7G7u9HP5EkjRu1cNqrnkeuHlE1JiFrg"),U=(0,s.useCallback)(async()=>{try{let{data:{user:e}}=await M.auth.getUser();if(!e){let{error:e}=await M.auth.signInAnonymously();if(e){console.error("Error signing in anonymously:",e),a(!1);return}}let t=await navigator.mediaDevices.getUserMedia({audio:!0});k(t);let r=new MediaRecorder(t,{mimeType:"audio/mp4"});C(r);let s=[];r.ondataavailable=e=>{e.data.size>0&&(s.push(e.data),z(t=>[...t,e.data]))},z([]),r.start(1e3),o(!0),u(0),F(0)}catch(e){console.error("Error accessing microphone:",e),a(!1)}},[a,M.auth]);(0,s.useEffect)(()=>{t&&!n&&U()},[t,n,U]),(0,s.useEffect)(()=>{if(!n)return;let e=setInterval(()=>{u(e=>{let t=e+100;return F(t/3e5*100),t})},100);return()=>clearInterval(e)},[n]);let L=async()=>{if(R&&"inactive"!==R.state){R.stop();let e=new Blob(S,{type:"audio/mp4"});try{let t=new FileReader;t.readAsDataURL(e),t.onloadend=async function(){let r=t.result.split(",")[1];b("Uploading recording..."),j(async()=>{await w(r);let t=URL.createObjectURL(e);i(t,c/1e3),y&&(y.getTracks().forEach(e=>e.stop()),k(void 0)),o(!1),E(!1),u(0),F(0),a(!1)})}}catch(e){console.error("Error processing recording:",e)}}else y&&(y.getTracks().forEach(e=>e.stop()),k(void 0)),o(!1),E(!1),u(0),F(0),a(!1)},J=e=>{!e&&n?E(!0):E(!1),a(e)},D=e=>{let t=Math.floor(e/6e4),a=Math.floor(e%6e4/1e3),r=Math.floor(e%1e3/10);return"".concat(t.toString().padStart(2,"0"),":").concat(a.toString().padStart(2,"0"),",").concat(r.toString().padStart(2,"0"))};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d,{open:t,onOpenChange:J,children:(0,r.jsxs)(h,{side:"bottom",className:"bg-black text-white p-0 h-[350px] rounded-t-[20px] border-t border-white/10",children:[(0,r.jsx)("div",{className:"w-full h-1 bg-white/20 rounded-full mx-auto my-2 max-w-[48px]"}),(0,r.jsx)("div",{className:"flex flex-col items-center justify-between h-[calc(100%-24px)] p-4",children:N?(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center flex-1 w-full",children:[(0,r.jsx)(p.A,{className:"h-8 w-8 animate-spin mb-4"}),(0,r.jsx)("h2",{className:"text-lg font-semibold text-white",children:m})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("h2",{className:"text-lg font-semibold text-white mb-2",children:m}),(0,r.jsx)("div",{className:"text-3xl font-medium text-white mb-4",children:D(c)}),(0,r.jsx)("div",{className:"w-full h-24 relative mb-6",children:(0,r.jsx)(f,{isRecording:n,audioStream:y,color:"#FFFFFF"})}),(0,r.jsx)(x.$,{onClick:L,className:"w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mb-4 transition-transform hover:scale-105 active:scale-95","aria-label":"Stop recording",children:(0,r.jsx)("div",{className:"w-6 h-6 rounded-sm bg-black"})})]})})]})}),I&&(0,r.jsxs)("div",{className:"fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 text-white cursor-pointer",onClick:()=>J(!0),children:[(0,r.jsx)("div",{className:"absolute top-0 left-0 right-0 h-0.5 bg-white/10",children:(0,r.jsx)("div",{className:"h-full bg-white transition-all duration-100",style:{width:"".concat(A,"%")}})}),(0,r.jsxs)("div",{className:"flex items-center justify-between p-3",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{className:"w-2 h-2 rounded-full bg-red-500 animate-pulse mr-3"}),(0,r.jsx)(g.A,{className:"w-5 h-5 mr-2 text-white/60"}),(0,r.jsx)("span",{className:"font-medium text-sm",children:D(c)})]}),(0,r.jsx)(x.$,{variant:"ghost",size:"icon",className:"text-white hover:text-white hover:bg-white/10 rounded-full",onClick:e=>{e.stopPropagation(),L()},children:(0,r.jsx)(l.A,{className:"h-5 w-5"})})]})]})]})}let j=(0,b.createServerReference)("40fd450efc649b708b6c1325f0112b8a0b1fd15581",b.callServer,void 0,b.findSourceMapURL,"updateEmail");var y=a(6045);let k=y.bL;y.l9;let R=y.ZL,C=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.hJ,{className:(0,o.cn)("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",a),...s,ref:t})});C.displayName=y.hJ.displayName;let S=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsxs)(R,{children:[(0,r.jsx)(C,{}),(0,r.jsx)(y.UC,{ref:t,className:(0,o.cn)("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",a),...s})]})});S.displayName=y.UC.displayName;let z=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:(0,o.cn)("flex flex-col space-y-2 text-center sm:text-left",t),...a})};z.displayName="AlertDialogHeader";let I=e=>{let{className:t,...a}=e;return(0,r.jsx)("div",{className:(0,o.cn)("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",t),...a})};I.displayName="AlertDialogFooter";let E=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.hE,{ref:t,className:(0,o.cn)("text-lg font-semibold",a),...s})});E.displayName=y.hE.displayName;let A=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.VY,{ref:t,className:(0,o.cn)("text-sm text-muted-foreground",a),...s})});A.displayName=y.VY.displayName;let F=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.rc,{ref:t,className:(0,o.cn)((0,x.r)(),a),...s})});F.displayName=y.rc.displayName;let M=s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(y.ZD,{ref:t,className:(0,o.cn)((0,x.r)({variant:"outline"}),"mt-2 sm:mt-0",a),...s})});M.displayName=y.ZD.displayName;let U=s.forwardRef((e,t)=>{let{className:a,type:s,...i}=e;return(0,r.jsx)("input",{type:s,className:(0,o.cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",a),ref:t,...i})});U.displayName="Input";var L=a(5477),J=a(6547);function D(){let[e,t]=(0,s.useState)(!1),[a,i]=(0,s.useState)(""),[n,l]=(0,s.useState)(!1),o=async e=>{if(e.preventDefault(),a)try{l(!0),await j(a),J.oR.success("Email updated successfully! Next time we will notify you when your summaries are ready."),t(!1)}catch(e){var r;console.error("Error updating email:",e),(null===(r=e.message)||void 0===r?void 0:r.includes("security purposes"))?J.oR.error("Please wait a moment before trying again"):J.oR.error("Failed to update email. Please try again later.")}finally{l(!1)}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x.$,{variant:"ghost",size:"icon",onClick:()=>t(!0),className:"text-white/40 hover:text-white hover:bg-white/10",children:(0,r.jsx)(L.A,{className:"h-5 w-5"})}),(0,r.jsx)(k,{open:e,onOpenChange:t,children:(0,r.jsxs)(S,{className:"bg-[#1C1C1E]/95 border-white/[0.08] text-white",children:[(0,r.jsxs)(z,{children:[(0,r.jsx)(E,{className:"text-white",children:"Get Notified"}),(0,r.jsx)(A,{className:"text-white/60",children:"Subscribe to receive notifications when your recordings are ready. You'll need to verify your email address."})]}),(0,r.jsxs)("form",{onSubmit:o,className:"mt-4 space-y-4",children:[(0,r.jsx)(U,{type:"email",placeholder:"Enter your email",value:a,onChange:e=>i(e.target.value),required:!0,className:"bg-white/5 border-white/10 text-white placeholder:text-white/40"}),(0,r.jsxs)("div",{className:"flex justify-end gap-3",children:[(0,r.jsx)(x.$,{type:"button",variant:"ghost",onClick:()=>t(!1),className:"text-white/60 hover:text-white hover:bg-white/10",children:"Cancel"}),(0,r.jsx)(x.$,{type:"submit",disabled:n,className:"bg-white/10 text-white hover:bg-white/20",children:n?"Updating...":"Subscribe"})]})]})]})})]})}var P=a(9526),Y=a(9633);let Z=(0,b.createServerReference)("7f89c46646583aea47b38de623432048b01e926c4d",b.callServer,void 0,b.findSourceMapURL,"deleteRecording");var _=a(5688),O=a(5004),T=a(6892),G=a(2596);let V=_.bL,$=_.l9;_.YJ,_.ZL,_.Pb,_.z6,s.forwardRef((e,t)=>{let{className:a,inset:s,children:i,...n}=e;return(0,r.jsxs)(_.ZP,{ref:t,className:(0,o.cn)("flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",s&&"pl-8",a),...n,children:[i,(0,r.jsx)(O.A,{className:"ml-auto"})]})}).displayName=_.ZP.displayName,s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(_.G5,{ref:t,className:(0,o.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...s})}).displayName=_.G5.displayName;let B=s.forwardRef((e,t)=>{let{className:a,sideOffset:s=4,...i}=e;return(0,r.jsx)(_.ZL,{children:(0,r.jsx)(_.UC,{ref:t,sideOffset:s,className:(0,o.cn)("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",a),...i})})});B.displayName=_.UC.displayName;let q=s.forwardRef((e,t)=>{let{className:a,inset:s,...i}=e;return(0,r.jsx)(_.q7,{ref:t,className:(0,o.cn)("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",s&&"pl-8",a),...i})});function H(e){let{className:t,...a}=e;return(0,r.jsx)("div",{className:(0,o.cn)("animate-pulse rounded-md bg-primary/10",t),...a})}q.displayName=_.q7.displayName,s.forwardRef((e,t)=>{let{className:a,children:s,checked:i,...n}=e;return(0,r.jsxs)(_.H_,{ref:t,className:(0,o.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),checked:i,...n,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(_.VF,{children:(0,r.jsx)(T.A,{className:"h-4 w-4"})})}),s]})}).displayName=_.H_.displayName,s.forwardRef((e,t)=>{let{className:a,children:s,...i}=e;return(0,r.jsxs)(_.hN,{ref:t,className:(0,o.cn)("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",a),...i,children:[(0,r.jsx)("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:(0,r.jsx)(_.VF,{children:(0,r.jsx)(G.A,{className:"h-2 w-2 fill-current"})})}),s]})}).displayName=_.hN.displayName,s.forwardRef((e,t)=>{let{className:a,inset:s,...i}=e;return(0,r.jsx)(_.JU,{ref:t,className:(0,o.cn)("px-2 py-1.5 text-sm font-semibold",s&&"pl-8",a),...i})}).displayName=_.JU.displayName,s.forwardRef((e,t)=>{let{className:a,...s}=e;return(0,r.jsx)(_.wv,{ref:t,className:(0,o.cn)("-mx-1 my-1 h-px bg-muted",a),...s})}).displayName=_.wv.displayName;var X=a(226),Q=a(7306),K=a(8151),W=a(5822),ee=a(3311);function et(e){let{content:t,isSelected:a}=e,{currentRecording:i,isPlaying:n,play:l,pause:o,clearCurrentRecording:d}=(0,P.n)(),c=(0,ee.useRouter)(),[u,m]=(0,s.useState)(t.status),[h,f]=(0,s.useState)("summarized"!==u&&"error"!==u),[g,b]=(0,s.useState)(!1),w=!t.title,v=(null==i?void 0:i.id)===t.id;(0,s.useEffect)(()=>{let e=null,a=async()=>{try{let a=await (0,Y.M)(t.id);((null==a?void 0:a.status)==="summarized"||(null==a?void 0:a.status)==="error")&&(m(a.status),f(!1),e&&clearInterval(e),"summarized"===a.status&&c.refresh())}catch(t){console.error("Error polling status:",t),f(!1),e&&clearInterval(e)}};return h&&(e=setInterval(a,1e3)),()=>{e&&clearInterval(e)}},[h,t.id,c]);let N=async e=>{e.stopPropagation(),w||b(!0)},j=async()=>{try{await Z(t.id),v&&d(),J.oR.success("Recording deleted successfully")}catch(e){console.error("Delete error:",e),J.oR.error("Failed to delete recording")}};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"group relative px-4 py-4 flex items-center justify-between transition-all duration-200\n          border-b border-white/[0.03] hover:bg-gradient-to-r from-white/[0.05] to-white/[0.02]\n          ".concat(w?"cursor-default bg-white/[0.02]":"cursor-pointer","\n          ").concat(a?"bg-white/[0.08]":""),onClick:()=>{w||c.push("/".concat(t.id))},children:[(0,r.jsxs)("div",{className:"flex items-center min-w-0",children:[(0,r.jsx)("div",{className:"relative shrink-0 mr-4",children:(0,r.jsx)(x.$,{variant:"ghost",size:"icon",className:"relative w-10 h-10 text-white hover:text-white hover:bg-white/10 rounded-xl\n                transition-all duration-300 hover:scale-110 active:scale-95 group-hover:shadow-lg group-hover:shadow-white/5\n                ".concat(w?"bg-white/5 ring-1 ring-white/10":"","\n                ").concat(v&&n?"bg-white/15 ring-2 ring-white/20 shadow-xl shadow-white/10":""),onClick:e=>{e.stopPropagation(),w||(v&&n?o():l(t))},disabled:w,children:w?(0,r.jsxs)("div",{className:"relative flex items-center justify-center",children:[(0,r.jsx)("div",{className:"absolute inset-0 rounded-xl bg-gradient-to-tr from-white/[0.05] to-white/[0.02] animate-pulse"}),(0,r.jsx)(p.A,{className:"h-4 w-4 animate-spin text-white/60 relative z-10"})]}):v&&n?(0,r.jsx)(X.A,{className:"h-4 w-4"}):(0,r.jsx)(Q.A,{className:"h-4 w-4 ml-0.5"})})}),(0,r.jsx)("div",{className:"min-w-0 flex-1",children:(0,r.jsx)("div",{className:"flex items-center gap-3",children:w?(0,r.jsxs)("div",{className:"space-y-2.5 w-full",children:[(0,r.jsxs)("div",{className:"flex items-center gap-3",children:[(0,r.jsx)(H,{className:"h-4 w-40 bg-white/[0.03]"}),(0,r.jsx)(H,{className:"h-5 w-20 bg-white/[0.03]"})]}),(0,r.jsx)(H,{className:"h-3 w-28 bg-white/[0.03]"})]}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"min-w-0 w-full",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between gap-3 mb-1",children:[(0,r.jsx)("h3",{className:"text-sm font-medium text-white truncate group-hover:text-white/90 transition-colors",children:t.title||"Untitled Recording"}),u?(0,r.jsxs)("span",{className:"inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full \n        ".concat({processing:"bg-blue-400/10 text-blue-400 ring-1 ring-blue-400/30",transcribing:"bg-yellow-400/10 text-yellow-400 ring-1 ring-yellow-400/30",error:"bg-red-400/10 text-red-400 ring-1 ring-red-400/30",summarized:"bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/30"}[u]),children:["processing"===u&&(0,r.jsx)(p.A,{className:"w-3 h-3 mr-1 animate-spin"}),{processing:"Processing",transcribing:"Transcribing",error:"Error",summarized:"Ready"}[u]]}):null]}),(0,r.jsx)("p",{className:"text-xs text-white/40 group-hover:text-white/50 transition-colors",children:(e=>{if(!e)return"Unknown date";let t=new Date(e);return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"numeric",hour12:!0}).format(t)})(t.createdAt)})]})})})})]}),!w&&(0,r.jsx)("div",{className:"ml-4 shrink-0",children:(0,r.jsxs)(V,{children:[(0,r.jsx)($,{asChild:!0,children:(0,r.jsx)(x.$,{variant:"ghost",size:"icon",className:"text-white/40 hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100  transition-all duration-300 rounded-lg hover:scale-110 active:scale-95",onClick:e=>e.stopPropagation(),children:(0,r.jsx)(K.A,{className:"h-4 w-4"})})}),(0,r.jsx)(B,{align:"end",sideOffset:8,className:"w-56 bg-[#1C1C1E]/90 backdrop-blur-xl border-white/[0.08] text-white  shadow-xl shadow-black/20 animate-in fade-in-0 zoom-in-95",children:(0,r.jsxs)(q,{onClick:N,className:"hover:bg-white/5 text-red-400 focus:bg-red-500/10 focus:text-red-400 transition-colors duration-200",children:[(0,r.jsx)(W.A,{className:"mr-2 h-4 w-4"}),(0,r.jsx)("span",{children:"Delete"})]})})]})})]}),(0,r.jsx)(k,{open:g,onOpenChange:b,children:(0,r.jsxs)(S,{className:"bg-[#1C1C1E]/95 border-white/[0.08] text-white",children:[(0,r.jsxs)(z,{children:[(0,r.jsx)(E,{className:"text-white",children:"Delete Recording"}),(0,r.jsx)(A,{className:"text-white/60",children:"Are you sure you want to delete this recording? This action cannot be undone."})]}),(0,r.jsxs)(I,{children:[(0,r.jsx)(M,{className:"bg-white/5 text-white hover:bg-white/10 border-white/[0.08]",onClick:e=>e.stopPropagation(),children:"Cancel"}),(0,r.jsx)(F,{className:"bg-red-500/90 text-white hover:bg-red-500",onClick:e=>{e.stopPropagation(),j()},children:"Delete"})]})]})})]})}function ea(e){let{currentRecordingId:t,contents:a}=e,[i,n]=(0,s.useState)(!1),[l,o]=(0,s.useState)(!1),[d,c]=(0,s.useState)(!1),[u,m]=(0,s.useState)(!1),[h,f]=(0,s.useState)(!0),{currentRecording:x}=(0,P.n)(),p=(0,v.createBrowserClient)("https://ceczcbdetftwjybhvhlv.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlY3pjYmRldGZ0d2p5Ymh2aGx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyMzg5MjIsImV4cCI6MjA1MTgxNDkyMn0.YGLZniICb_Kj7G7u9HP5EkjRu1cNqrnkeuHlE1JiFrg");(0,s.useEffect)(()=>{(async()=>{try{let{data:{user:e}}=await p.auth.getUser(),t=!(null==e?void 0:e.email)&&(null==e?void 0:e.aud)==="authenticated";if(c(t),t&&(null==e?void 0:e.created_at)){let t=new Date(e.created_at),a=new Date(Date.now()-216e5);m(t<a)}}catch(e){console.error("Error checking user:",e)}finally{f(!1)}})()},[]);let b=async e=>{n(e),e&&o(!0)};return(0,r.jsxs)("div",{className:"flex flex-col min-h-screen bg-black",children:[(0,r.jsx)("header",{className:"px-4 py-6 backdrop-blur-sm bg-black/10 sticky top-0 z-10",children:(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsx)("h1",{className:"text-2xl font-medium text-white/90",children:"Recordings"}),!h&&d&&u&&(0,r.jsx)(D,{})]})}),(0,r.jsx)("div",{className:"flex-1 relative",children:(null==a?void 0:a.length)>0?(0,r.jsx)("div",{className:"w-full divide-y divide-white/[0.06]",children:a.map(e=>(0,r.jsx)(et,{content:e,isSelected:e.id===t},e.id))}):(0,r.jsx)("div",{className:"absolute inset-0 flex flex-col items-center justify-center px-4",children:(0,r.jsx)("div",{className:"p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.03]",children:(0,r.jsxs)("div",{className:"flex flex-col items-center",children:[(0,r.jsx)(g.A,{className:"h-8 w-8 text-white/20 mb-4",strokeWidth:1.5}),(0,r.jsx)("h2",{className:"text-lg font-normal text-white/60 mb-1.5",children:"Start Recording"}),(0,r.jsx)("p",{className:"text-white/40 text-center text-sm leading-relaxed max-w-[260px]",children:"Tap the record button below to create your first audio note"})]})})})}),!x&&!l&&(0,r.jsx)("div",{className:"fixed bottom-0 left-0 right-0 p-6 flex justify-center items-center bg-gradient-to-t from-black via-black/90 to-transparent pb-8",children:(0,r.jsx)("button",{onClick:()=>b(!0),className:"w-14 h-14 rounded-full bg-red-500/90 flex items-center justify-center  transition-all duration-300 hover:scale-105 hover:bg-red-500 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:ring-offset-2  focus:ring-offset-black","aria-label":"Start recording",children:(0,r.jsx)("div",{className:"w-5 h-5 rounded-full bg-white/95 shadow-inner"})})}),(0,r.jsx)(N,{isOpen:i,onOpenChange:b,onComplete:()=>{}})]})}},9526:(e,t,a)=>{"use strict";a.d(t,{G:()=>l,n:()=>o});var r=a(4568),s=a(7620),i=a(9633);let n=(0,s.createContext)(null);function l(e){let{children:t}=e,[a,l]=(0,s.useState)(null),[o,d]=(0,s.useState)(!1),[c,u]=(0,s.useState)(0),[m,h]=(0,s.useState)(0),f=(0,s.useRef)(null);(0,s.useEffect)(()=>(f.current=new Audio,f.current.addEventListener("timeupdate",()=>{var e;u((null===(e=f.current)||void 0===e?void 0:e.currentTime)||0)}),f.current.addEventListener("loadedmetadata",()=>{var e;h((null===(e=f.current)||void 0===e?void 0:e.duration)||0)}),f.current.addEventListener("ended",()=>{d(!1),u(0)}),()=>{f.current&&(f.current.pause(),f.current.src="")}),[]);let x=async(e,t)=>{var a,r;if(t){if(l(t),f.current){let e="/api/source?key=".concat(null===(a=t.source)||void 0===a?void 0:a.data);f.current.src=e,h(f.current.duration||0)}}else{let t=await (0,i.M)(e);if(t&&(l(t),f.current)){let e="/api/source?key=".concat(null===(r=t.source)||void 0===r?void 0:r.data);f.current.src=e,h(f.current.duration||0)}}};return(0,r.jsx)(n.Provider,{value:{currentRecording:a,isPlaying:o,currentTime:c,duration:m,play:e=>{var t;if(!f.current)return;l(e);let a="/api/source?key=".concat(null===(t=e.source)||void 0===t?void 0:t.data);f.current.src=a,f.current.play(),d(!0)},pause:()=>{f.current&&(f.current.pause(),d(!1))},resume:()=>{f.current&&(f.current.play(),d(!0))},seek:e=>{f.current&&(f.current.currentTime=e,u(e))},clearCurrentRecording:()=>{f.current&&(f.current.pause(),f.current.src=""),l(null),d(!1),u(0),h(0)},setCurrentRecordingById:x},children:t})}function o(){let e=(0,s.useContext)(n);if(!e)throw Error("useAudio must be used within an AudioProvider");return e}},6525:(e,t,a)=>{"use strict";a.d(t,{$:()=>d,r:()=>o});var r=a(4568),s=a(7620),i=a(7680),n=a(3686),l=a(9773);let o=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),d=s.forwardRef((e,t)=>{let{className:a,variant:s,size:n,asChild:d=!1,...c}=e,u=d?i.DX:"button";return(0,r.jsx)(u,{className:(0,l.cn)(o({variant:s,size:n,className:a})),ref:t,...c})});d.displayName="Button"},9773:(e,t,a)=>{"use strict";a.d(t,{cn:()=>i});var r=a(5928),s=a(6564);function i(){for(var e=arguments.length,t=Array(e),a=0;a<e;a++)t[a]=arguments[a];return(0,s.QP)((0,r.$)(t))}},9633:(e,t,a)=>{"use strict";a.d(t,{M:()=>s});var r=a(6541);let s=(0,r.createServerReference)("7f4f32e228f8053d3f2f40b8267c754af0dd2e1eab",r.callServer,void 0,r.findSourceMapURL,"getRecordingById")}},e=>{var t=t=>e(e.s=t);e.O(0,[471,911,125,587,855,358],()=>t(1360)),_N_E=e.O()}]);