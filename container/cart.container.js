import fileSystem from 'fs';

export default class CartContainer{

    constructor(file){
        this.file = file;
        this.encoding = 'utf-8';
    }

    async checkForFile(){
        let file;
        try {
            file = await fileSystem.promises.readFile(this.file, this.encoding);
        }
        catch (error){
            if (error.code == 'ENOENT') {
                await fileSystem.promises.writeFile(this.file, '[]');
                file = await fileSystem.promises.readFile(this.file, this.encoding);
            }
            else{
                console.log(error.message);
            } 
        }
        return file;
    }

    async save(object){
        try {
            let content = JSON.parse(await this.checkForFile());  
            object.timestamp = Date.now();
            content.push(await this.addId(content, object));
            await fileSystem.promises.writeFile(this.file, JSON.stringify(content, null, 2));
            return object.id;
        } catch(error){
            throw new Error(`${error.message}`);
        }  
    }

    async addId(content, object){
        let i = content.length;
        if (i == 0){
            object.id = 1;
            return object;
        }
        object.id = parseInt(content[i-1].id) + 1;
        return object;
    }

    async deleteById(id){
        try{
            let content = JSON.parse(await this.checkForFile());
            let productIndex = content.findIndex(object => object.id == id);
            if (productIndex != -1){
                content.splice(productIndex, 1);
                await fileSystem.promises.writeFile(this.file, JSON.stringify(content, null, 2));
            }            
        } catch(error) {
            throw new Error(`${error.message}`);
        }        
    }

    async getById(id){
        try{
            let content = JSON.parse(await this.checkForFile()); 
            let cart = content.filter(object => object.id == id);
            if (cart.length == 0) {
                return null;
            }                
            else {
                console.log(cart);
                return cart;
            }
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    async addProduct(id, object){

        let fileContent = JSON.parse(await this.checkForFile()); 
        let cart = fileContent.filter(object => object.id == id);

        console.log(cart)

        cart[0].products.push(object[0]);
        

        try{
            let productIndex = fileContent.findIndex(object => object.id == id);                   
            if (productIndex != -1){
                fileContent.splice(productIndex, 1);
                await fileSystem.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2));
            }            
        } catch(error) {
            throw new Error(`${error.message}`);
        }   

        let content = JSON.parse(await this.checkForFile());
        content.push(cart[0]); 
        await fileSystem.promises.writeFile(this.file, JSON.stringify(content, null, 2));
        return cart[0].id;
    }

    async removeProduct(id, objectId){
        
        let fileContent = JSON.parse(await this.checkForFile()); 
        let cart = fileContent.filter(object => object.id == id);
        let productIndex = cart[0].products.findIndex(object => object.id == objectId);
        let cartIndex = fileContent.findIndex(object => object.id == id)

        console.log(cart[0].products)
        console.log(productIndex)

        if (productIndex != -1)
            cart[0].products.splice(productIndex, 1);
        
        try{         
            if (cartIndex != -1){
                fileContent.splice(cartIndex, 1);
                await fileSystem.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2));
            }            
        } catch(error) {
            throw new Error(`${error.message}`);
        }   

        fileContent.push(cart[0]); 
        await fileSystem.promises.writeFile(this.file, JSON.stringify(fileContent, null, 2));
        return cart[0].id;
    }
}