async function fetchImages(url, param) {
    let data = null;
    try{
        const res = await fetch(url + "?query=" + param, {
            headers: {
                'Authorization': "qvd6AOzjVQgD8OKchCX928MxvVmKjO2hf83G4swu3uESbqrtCkbGMiGs"
            },
        })
        data = await res.json();
        return data["photos"].map(obj => obj.src.medium);
    }
    catch (e){
        console.log(e);
    }
}

export {fetchImages};
