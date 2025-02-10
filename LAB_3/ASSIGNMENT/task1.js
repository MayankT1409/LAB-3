const fs = require('fs')
const path = require('path')

const fileCategories = {
    Images : ['.jpg','.jpeg','.png','.gif'],
    Documnets : ['.pdf','.doc','.docx','.txt'],
    Videos : ['.mp4','.mkv','.mov']
};

function organizeDirectory(directoryPath){
    try{
        if(!fs.existsSync(directoryPath)){
            console.error("Error : Directory does not exist.")
            return;
        }

        const files  = fs.readdirSync(directoryPath)


        files.forEach(file =>{
            const filePath = path.join(directoryPath,file);
            if(fs.statSync(filePath).isFile()){
                moveFilecategory(directoryPath,file)
            }
        })

        console.log("File organized successfully!")
    }catch(error){
        console.log("An error occured: ",error)
    }
}

function moveFilecategory(directoryPath,file){
    const fileExt  = path.extname(file).toLowerCase();

    for(const category in fileCategories){
        if(fileCategories[category].includes(fileExt)){
            const categoryPath = path.join(directoryPath,category)

            if(!fs.existsSync(categoryPath)){
                fs.mkdirSync(categoryPath)
            }

            const oldPath = path.join(directoryPath,file)
            const newPath = path.join(categoryPath,file)

            fs.renameSync(oldPath,newPath)
            console.log(`Move : ${file} -> ${category}`)
            return
        }
    }
    console.log(`Uncategorized : ${file}`);
}

const directoryPath = process.argv[2];
if(directoryPath){
    organizeDirectory(directoryPath)
}else{
    console.log()
}