import {useEffect,useState} from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import { Carousel } from 'antd';
import { Descriptions } from 'antd';
import { Layout } from 'antd';
import { Button } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

import { Table } from "antd";


import 'antd/dist/antd.css';
const { Meta} = Card;

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';


function UserProfile() {
const [user,setUser]=useState(null)
const [userProfile,setUserProfile]=useState([])


    useEffect(() => {
      // getter
 setUser(  JSON.parse(window.localStorage.getItem('session')));   

 !!user ?

 fetch(`http://localhost:3000/user_profiles/${user.id}`)
 .then(response => response.json())
 .then((data)=> {
setUserProfile(data)
 }):console.log("yeah")

 console.log(userProfile)

    }, [])

  return (
    <>

<Layout  >
      <Header  style={{backgroundColor: "#a0d2eb"}}>

<div    style={{float: "left"}}>

  Welcome 
</div>

<div   style={{float: "right"}}>

<EditOutlined/>
edit

</div>


      </Header>


      <Layout>


 <Content   style={{backgroundColor: "#ffffff"}}>

 <Row >

      <Col span={10} style={{textAlign:'center'}}>
      <Image src={userProfile.avatar_img}/>
      
      </Col>

      <Col span={14}>

          <Row>
              <Col span={12}>
                  <Card title="name" bordered={true}   >
                             {userProfile.full_name}
                  </Card>

              </Col>
             
              <Col span={12}>
                  <Card title="phone" bordered={true}>
                             {userProfile.phone_number}
                  </Card>

              </Col>
            </Row>
            <Row>
              <Col span={12}>
                  <Card title="gender" bordered={true}>
                             {userProfile.gender}
                  </Card>

              </Col>

              <Col span={12}>
                  <Card title="bio" bordered={true}>
                             {userProfile.bio}
                  </Card>

              </Col>
            </Row>




      </Col>


      
</Row>

 </Content>
      </Layout>


      <Footer
        style={{textAlign:'center', 
        backgroundColor: '#ffffff' }}>

<Button type="dashed" block >
      View attended events
    </Button>
      
      </Footer>
    </Layout>
  

    </>
  )
}

<<<<<<< HEAD
export default UserProfile
=======
export default Userprofile
>>>>>>> dcebd3f0717b2956f16df10184aae4e55ecfd674
