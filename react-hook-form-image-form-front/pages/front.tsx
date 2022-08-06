import {ChangeEvent, FC, useState} from "react";
import axios from "axios";
import Button from '@material-ui/core/Button'

const IconUpload = () => {

    const [userIconFormData, setUserIconFormData] = useState<File>()

    const handleSetImage = (e: ChangeEvent<HTMLInputElement>) => {
         //画像ファイルを取得
        const file = e.target.files?.[0]
        if(file) {
            setUserIconFormData(file)
        }
    }

    const handleUpload = async () => {
        const formData = new FormData()

        //ここの名前(image)はサーバー側で定義してある必要がある　バックエンドと名前をそれwtw扱う
        formData.append("image", userIconFormData as File)

       await axios({
            method: 'post',
            url :'http://localhost:8080/api',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(( res )=>{
            console.log(res.data)
        })
    }




    return (
        <>
            <form>
                <p>アイコンアップロード</p>
                <input
                    type="file"
                    accept="image/*,.png,.jpg,.jpeg,.gif"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSetImage(e)}
                />
                <Button variant="contained" color="primary" onClick={handleUpload}/>
            </form>
        </>
    )
}

export default IconUpload;