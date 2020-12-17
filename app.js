const TEL_PATH = '/music/file_352.mp3'
const API_FILEDONWLOAD = 'http://localhost:3000/fileDownload?'

const load = () => {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open('GET', API_FILEDONWLOAD + TEL_PATH, true)
        xhr.responseType = 'arraybuffer'
        xhr.send()

        xhr.addEventListener('progress', (e) => {
            console.log(`${e.type}: ${e.loaded} bytes transferred\n`)            
        })

        xhr.addEventListener('load', (e) => {            
            const audioData = e.target.response || e.target.result
            resolve(audioData)            
        })

        xhr.addEventListener('error', () => {
            reject(Error('Track ' + TEL_PATH + ' failed to load'))
        })
    })
}

load().then((audiData) => {
    console.log(audiData)
}).catch((err) =>{
    console.log(err)
})
