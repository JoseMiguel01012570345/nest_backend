import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class User {

    @Prop({ unique:true , required:true } ) 
    id?:string

    @Prop({unique: true , require:true})
    email:string
    
    @Prop({require:true})
    name: string
    
    @Prop({minlength: 6 , require: true})
    password?:string
    
    @Prop({default: true  })
    isActive: boolean
    
    @Prop({type: [ String] , default: ['user']  })
    roles:string[]    
}

export const UserSchema = SchemaFactory.createForClass(User)