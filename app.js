const readline = require('node:readline');
const fs = require('fs');


let taskPath = 'task.json'
let exit = false
const date = new Date()

const taskTemplate = {
    id: '',
    description: null,
    status: '',
    createdAt: '',
    updatedAt: ''
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    
});

const input = () => {
    
    return new Promise((resolve) => {
        rl.question("task-cli ", (userCommand => {
            resolve(userCommand)
        }))

    })

}


const main = async () => {

    while (exit != true) {
        userInput = await input()
        let words = userInput.split(" ")
        let taskList = []
       
        if (words[0] == "add") {
            let task = ''
            for (let index = 1; index < words.length; index++) {task += ' ' +  words[index] + ' ';}

            const jsonData = fs.readFileSync(taskPath,'utf-8')
            if (jsonData) {
                taskList = JSON.parse(jsonData)
            }

            let newId = taskList.length > 0 ? taskList[taskList.length - 1].id + 1 : 1

            let newTask = {
                'id': newId,
                'description': task,
                'status': 'todo',
                'createdAt': new Date().toISOString(),
                'updatedAt': new Date().toISOString()
            }

            taskList.push(newTask)
            fs.writeFileSync(taskPath,JSON.stringify(taskList,null,2))

        } else if (words[0] == "update") {

            
            let id = parseInt(words[1])
            let task = ''
            taskList = []
            for (let index = 2; index < words.length; index++) {task += ' ' +  words[index] + ' ';}
            
            const jsonData = fs.readFileSync(taskPath,'utf-8')
            if (jsonData) {
                taskList = JSON.parse(jsonData)
            }



            for (let index = 0; index < taskList.length; index++) {
                const element = taskList[index];
                
                if (element['id'] == id) {

                    taskList[index]["description"] = task
                    taskList[index]["updatedAt"] = new Date().toISOString()
                    
                }
            }


            fs.writeFileSync(taskPath,JSON.stringify(taskList,null,2))

            
        } else if (words[0] == "delete") {

            let id = parseInt(words[1])
            taskList = []

            const jsonData = fs.readFileSync(taskPath,'utf-8')
            if (jsonData) {
                taskList = JSON.parse(jsonData)
            }

            console.log(id)
            for (let index = 0; index < taskList.length; index++) {
                const element = taskList[index];

                //console.log(element['id'])
                
                if (element['id'] == id) {

                    console.log(element)

                    taskList.splice(index,index)
                    break
     
                }
            }


            fs.writeFileSync(taskPath,JSON.stringify(taskList,null,2))


        } else if (words[0] == "mark-in-progress") {

            let id = words[1] - 1
            taskList = []

            const jsonData = fs.readFileSync(taskPath,'utf-8')
            if (jsonData) {
                taskList = JSON.parse(jsonData)
            }

            taskList[id]["status"] = "in-progress"
            taskList[id]["updatedAt"] = new Date().toISOString()

            fs.writeFileSync(taskPath,JSON.stringify(taskList,null,2))

            
            
        } else if (words[0] === "mark-done") {

            let id = words[1] - 1
            taskList = []

            const jsonData = fs.readFileSync(taskPath,'utf-8')
            if (jsonData) {
                taskList = JSON.parse(jsonData)
            }

            taskList[id]["status"] = "done"
            taskList[id]["updatedAt"] = new Date().toISOString()

            fs.writeFileSync(taskPath,JSON.stringify(taskList,null,2))
            
            
        } else if (words[0] === "list") {


            if (words[1] === "done") {

    
                taskList = []
    
                const jsonData = fs.readFileSync(taskPath,'utf-8')
                if (jsonData) {
                    taskList = JSON.parse(jsonData)
                }
    
                for (let index = 0; index < taskList.length; index++) {
                    const element = taskList[index];
                    
                    if (element['status'] == "done") {
                        console.log(element)
                        
                    }
    
                    
                }

                
            } else if (words[1] == "todo") {

                const jsonData = fs.readFileSync(taskPath,'utf-8')
                console.log(jsonData)

                for (let index = 0; index < taskList.length; index++) {
                    const element = taskList[index];
                    
                    if (element['status'] == "todo") {
                        console.log(element)
                        
                    }
    
                    
                }
                
            } else if (words[1] == "in-progress") {

                const jsonData = fs.readFileSync(taskPath,'utf-8')
                console.log(jsonData)

                for (let index = 0; index < taskList.length; index++) {
                    const element = taskList[index];
                    
                    if (element['status'] == "in-progress") {
                        console.log(element)
                        
                    }
    
                    
                }
                
            } else {

                const jsonData = fs.readFileSync(taskPath,'utf-8')
                console.log(jsonData)

            }


            
        } else {
            console.log("Error")
            
        }

        
    }

    rl.close()


}

main()






