import { Platform } from "react-native"

 class isIOS{
    ios=false
    constructor(){
        if(Platform.OS=='ios')
        {
            this.ios=true
        }
    }
}
export default new isIOS().ios