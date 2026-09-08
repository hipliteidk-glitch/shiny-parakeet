const {createCanvas}=require('@napi-rs/canvas'),fs=require('fs'),vm=require('vm'),{spawn,execFileSync}=require('child_process');
const canvas=createCanvas(576,1024),elements={film:canvas};
const context={document:{getElementById:id=>elements[id]||(elements[id]={})},window:{EXPORT_MODE:true},performance:{now:()=>0},requestAnimationFrame:()=>{}};vm.createContext(context);vm.runInContext(fs.readFileSync('animation.js','utf8'),context);
fs.mkdirSync('exports',{recursive:true});const ffmpeg=process.env.FFMPEG||execFileSync('/home/user/.venv/bin/python',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())'],{encoding:'utf8'}).trim();
const child=spawn(ffmpeg,['-y','-f','image2pipe','-vcodec','png','-r','24','-i','-','-an','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-movflags','+faststart','exports/sound-sense.mp4'],{stdio:['pipe','ignore','inherit']});
(async()=>{for(let i=0;i<864;i++){context.window.renderFilm(i/24);const buf=canvas.toBuffer('image/png');if(!child.stdin.write(buf))await new Promise(r=>child.stdin.once('drain',r));}child.stdin.end()})();child.on('exit',c=>process.exitCode=c);
