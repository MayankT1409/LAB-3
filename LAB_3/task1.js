const os = require('os')
const path  = require('path')
const fs = require('fs')

function getSystemInfo(){
    return{
        OS_TYPE: os.type(),
        TOTAL_MEMORY : `${(os.totalmem()/1024/1024).toFixed(2)} MB`,
        FREE_MEMORY : `${(os.freemem()/1024/1024).toFixed(2)} MB`,
        CPU_DETAIL : os.cpus()
    }
}

const logDir = path.join(__dirname,'logs')
const logFile = path.join(logDir,'system-info.txt')


if(!fs.existsSync(logDir)){
    fs.mkdirSync(logDir)
}

const SystemInfo = getSystemInfo();

const SystemFile = `
System Information:
--------------------
OS Type: ${SystemInfo.OS_TYPE}
Total Memory: ${SystemInfo.TOTAL_MEMORY}
Free Memory: ${SystemInfo.FREE_MEMORY}
CPU Details:
${SystemInfo.CPU_DETAIL.map((cpu, index) => `  CPU ${index + 1}: ${cpu.model}`).join('\n')}
`;

console.log(SystemFile)

fs.writeFile(logFile,SystemFile,(err)=>{
    if(err){
        console.log("Error while writing to File : " , err)
    }else{
        console.log("System Information saved to : " , logFile)
    }
})


