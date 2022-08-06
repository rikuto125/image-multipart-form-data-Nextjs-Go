package main

//ginでサーバを立ち上げる

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	engine := gin.Default()
	engine.POST("/api", func(c *gin.Context) {

		//keyの名前はフロントで指定した名前(今回はimage)
		file, header, err := c.Request.FormFile("image")
		if err != nil {
			c.String(http.StatusBadRequest, "Bad request")
			return
		}

		fmt.Printf("File: %s, Header: %v\n", file, header)

		//ヘッダーの名前取得
		fileName := header.Filename
		//fmt.Println("fileName:", fileName)

		//今のpathを取得
		dir, _ := os.Getwd()
		//fmt.Println("dir:", dir) ///Users/iwairikuto/GolandProjects/content-type-multipart-form-data-back

		//outに指定したpathを格納 今後はDBに入れるのよし //今回はimagesに入れる(適宜変更可能)
		out, err := os.Create(dir + "/images/" + fileName)
		fmt.Printf("out: %s\n", out)

		if err != nil {
			log.Fatal(err)
		}

		//ファイルを閉じるの忘れるな
		defer out.Close()

		//ioのcopyBufferでファイルをコピー
		_, err = io.Copy(out, file)
		if err != nil {
			log.Fatal(err)
		}

		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})
	engine.Run(":8080")

}
