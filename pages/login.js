import Link from "next/link"
import { Form, Input, Button, Checkbox } from 'antd';


function Login(){
    return (
        <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login"/>
        </div>
        <Form
          name="login-form"
        >
          <p className="form-title">LOG IN</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button  htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>
          <p>Dont have an account?<Link href="/signup">Sign Up</Link></p>
        </Form>
      </div>
    </div>
    )
    }
    export default Login