import React ,{useState}from 'react';
import {Button, Form, Input, Space} from "antd";
import FormItem from "antd/es/form/FormItem";
import {Logout, onLogout} from "../../Service/userApi";
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
};
const UserDetail = () => {
    const [disabled, setDisabled] = useState(true)

    const reset = () =>{
        setDisabled(false);
    }

    const submit = () =>{
        setDisabled(true)
    }

    const formRef = React.createRef()

    const logout = () => {
        onLogout().then(data => alert(JSON.stringify(data)))
        Logout().then(() => {})//window.location.href = "/")
    }

    return (
        <Form disabled={disabled} {...layout} className={"userinfo"} ref={formRef} >
            <FormItem name="name" label="NAME" >
                <Input defaultValue={"GOOD MORNING"} rules={{required:true}}></Input>
            </FormItem>
            <FormItem name={"email"} label={"Email"} >
                <Input defaultValue={""} rules={{required:true}}></Input>
            </FormItem>
            <FormItem {...tailLayout}>
                <Space>
                    <Button type={"primary"} htmlType={"submit"} onClick={submit}>Submit</Button>
                    <Button htmlType={"button"} onClick={reset} disabled={false}>Change</Button>
                </Space>
            </FormItem>
            <FormItem name={"order"} wrapperCol={{offset: 6, span: 16,}}>
                <Button disabled={false} onClick={logout}>按着玩</Button>
            </FormItem>
        </Form>
    );
}

export default UserDetail;