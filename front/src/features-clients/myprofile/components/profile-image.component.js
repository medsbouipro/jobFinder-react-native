import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components/native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import unknown from "../../../../assets/unknown.png";
import { Text } from "../../../components/typography/text.component";

const Container = styled.View`
  flex:0.2;
  flex-direction: row;
  align-items: center;
  background-color: #ece4b7;
  margin: 2%;
  border-radius: 10px;
`;

const ProfileImage = styled.Image`
  width: 20%;
  height: 80%;
  border-radius: 15px;
  margin: 15px;
  margin-right: 0px;
`;

const InfoContainer = styled.View`
  margin-left: 15px;
`;

const ImageComponent = () => {
  const { mysqlUser } = useContext(AuthenticationContext);
  console.log("====================================");
  console.log(mysqlUser);
  console.log("====================================");
  const [pic, setPic] = useState(null);
  
  useLayoutEffect(() => {
    if (mysqlUser.ClientImgUrl) {
      setPic(mysqlUser.ClientImgUrl);
    }
  }, [mysqlUser]);

  return (
    <Container>
      <ProfileImage source={mysqlUser?.ClientImgUrl ? { uri: pic } : unknown} />
      <InfoContainer>
        <Text>Name: John Doe</Text>
        <Text>Email: john.doe@example.com</Text>
      </InfoContainer>
    </Container>
  );
};

export default ImageComponent;
// import React, { useContext, useEffect, useState } from "react";
// import styled from "styled-components/native";
// import { Text } from "../../../components/typography/text.component";
// import { AuthenticationContext } from "../../../services/authentication/authentication.context";
// import unknown from "../../../../assets/unknown.png";
// const Container = styled.View`
//   flex-direction: row;
//   align-items: center;
//   background-color: #ece4b7;
//   margin: 2%;
//   border-radius: 15px;
// `;

// const ProfileImage = styled.Image`
//   width: 100px;
//   height: 100px;
//   border-radius: 500px;
//   margin: 15px;
//   margin-left: 1%;
// `;

// const InfoContainer = styled.View`
//   margin-left: 1%;
//   overflow: hidden;
// `;

// const ImageComponent = () => {
//   const { mysqlUser } = useContext(AuthenticationContext);
//   console.log("====================================");
//   console.log(mysqlUser.workerImgUrl);
//   console.log("====================================");
//   const [pic, setPic] = useState(null);
//   useEffect(() => {
//     if (mysqlUser.workerImgUrl) {
//       setPic(mysqlUser.workerImgUrl);
//     }
//   }, []);
//   return (
//     <Container>
//       <ProfileImage source={mysqlUser.workerImgUrl ? { uri: pic } : unknown} />
//       <InfoContainer>
//         <Text>
//           Name: {mysqlUser.workerFirstName + " " + mysqlUser.workerLastName}
//         </Text>
//         <Text>Email: {mysqlUser.workerEmail}</Text>
//       </InfoContainer>
//     </Container>
//   );
// };

// export default ImageComponent;
