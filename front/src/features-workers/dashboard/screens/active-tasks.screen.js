// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   Modal,
//   TouchableOpacity,
// } from "react-native";
// import styled from "styled-components/native";
// import Icon from "react-native-vector-icons/Ionicons";

// const ActiveTasksScreen = ({route}) => {
//   const [tasks, setTasks] = useState(route.params.activeOffers);

//   const [selectedTask, setSelectedTask] = useState(null);

//   const handleAcceptTask = (taskId) => {
//     console.log(`Accepted task with ID: ${taskId}`);
//   };

//   const handleRejectTask = (taskId) => {
//     console.log(`Rejected task with ID: ${taskId}`);
//   };

//   const handleInfoPress = (task) => {
//     setSelectedTask(task);
//   };

//   const closeModal = () => {
//     setSelectedTask(null);
//   };

//   const renderTaskItem = ({ item }) => {
//     return (
//       <TaskItemContainer>
//         <Section>
//           <TaskTitle>{item.taskTitle}</TaskTitle>
//           <SectionEnd>
//               <MoreInfoIcon
//                 name="ellipsis-vertical"
//                 size={24}
//                 onPress={() => handleInfoPress(item)}
//               />
//           </SectionEnd>
//         </Section>

//         <TaskText>{item.taskText}</TaskText>
//         <TaskDate>{item.taskDate}</TaskDate>
//         <ButtonContainer>
//           <AcceptButton
//             title="Accept"
//             onPress={() => handleAcceptTask(item.taskId)}
//           />
//           <RejectButton
//             title="Reject"
//             onPress={() => handleRejectTask(item.taskId)}
//           />
//         </ButtonContainer>
//       </TaskItemContainer>
//     );
//   };

//   return (
//     <Container>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.taskId.toString()}
//         renderItem={renderTaskItem}
//         contentContainerStyle={ListContainer}
//         showsVerticalScrollIndicator={false}
//       />
//       <Modal visible={!!selectedTask} onRequestClose={closeModal}>
//         <ModalContent>
//           {selectedTask && (
//             <>
//               <ClientInfoLabel>Client Name:</ClientInfoLabel>
//               <ClientInfoText>clientName</ClientInfoText>

//               <ClientInfoLabel>Client Address:</ClientInfoLabel>
//               <ClientInfoText>clientAddress</ClientInfoText>

//               <ClientInfoLabel>Client Email:</ClientInfoLabel>
//               <ClientInfoText>clientEmail</ClientInfoText>

//               <ClientInfoLabel>Client Phone Number:</ClientInfoLabel>
//               <ClientInfoText>clientPhoneNumbe</ClientInfoText>

//               <ClientInfoLabel>Client City:</ClientInfoLabel>
//               <ClientInfoText>clientCity</ClientInfoText>
//             </>
//           )}
//           <Button title="Close" onPress={closeModal} />
//         </ModalContent>
//       </Modal>
//     </Container>
//   );
// };

// const Container = styled.View`
//   flex: 1;
//   padding: 16px;
//   background-color: #f5f5f5;
// `;

// const ListContainer = styled.View`
//   padding-bottom: 16px;
// `;

// const TaskItemContainer = styled.View`
//   background-color: #ffffff;
//   border-radius: 8px;
//   padding: 16px;
//   margin-bottom: 16px;
//   position: relative;
// `;

// const MoreInfoIcon = styled(Icon)`
  
// `;

// const TaskTitle = styled.Text`
//   font-size: 16px;
//   font-weight: bold;
//   margin-bottom: 8px;
// `;

// const TaskText = styled.Text`
//   font-size: 14px;
//   margin-bottom: 8px;
// `;

// const TaskDate = styled.Text`
//   font-size: 12px;
//   color: #888888;
//   margin-bottom: 16px;
// `;

// const ButtonContainer = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
// `;

// const AcceptButton = styled(Button)`
//   flex: 1;
//   margin-horizontal: 4px;
// `;

// const RejectButton = styled(Button)`
//   flex: 1;
//   margin-horizontal: 4px;
//   background-color: red;
// `;

// const ModalContent = styled.View`
//   background-color: #ffffff;
//   padding: 16px;
//   margin: 16px;
//   border-radius: 8px;
// `;

// const ClientInfoLabel = styled.Text`
//   font-weight: bold;
//   margin-bottom: 8px;
// `;

// const ClientInfoText = styled.Text`
//   margin-bottom: 16px;
// `;

// export const Section = styled.View`
//   flex-direction: row;
//   align-items: center;
// `;

// export const SectionEnd = styled.View`
//   flex: 1;
//   flex-direction: row;
//   justify-content: flex-end;
//   align-items: flex-start;

// `;

// export default ActiveTasksScreen;
import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { ip } from "../../../services/ip-address/ipaddress";

const OffersScreen = ({ route }) => {
  const [tasks, setTasks] = useState(route.params.activeOffers);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = (task) => {
    axios
      .get(`http://${ip}/clients/getclient/${task.clients_clientId}`)
      .then((response) => {
        console.log(response.data);
        setCurrentUser(response.data[0])
        setModalVisible(true)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleAcceptTask = (taskId) => {
    axios
      .put(`http://${ip}/tasks/updatetask/${taskId}`, {
        taskStatus: "active",
      })
      .then((response) => {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
        );
        console.log("task active:", response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(`Accepted task with ID: ${taskId}`);
  };

  const handleRejectTask = (taskId) => {
    axios
      .put(`http://${ip}/tasks/updatetask/${taskId}`, {
        taskStatus: "rejected",
      })
      .then((response) => {
        console.log("task rejected:", response.data);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task.taskId !== taskId)
        );
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(`Rejected task with ID: ${taskId}`);
  };

 

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderTaskItem = ({ item }) => {
    return (
      <TaskItemContainer style={{elevation:2,shadowOffset:15,shadowOpacity:2}}>
        <Section>
          <TaskTitle>Title :{item.taskTitle}</TaskTitle>
          <SectionEnd>
            <MoreInfoIcon
              name="ellipsis-vertical"
              size={24}
              onPress={() => fetchUser(item)}
            />
          </SectionEnd>
        </Section>

        <TaskText>Description : {item.taskText}</TaskText>
        <TaskDate>Date: {item.taskDate.slice(0, 10)}</TaskDate>
        <TaskDate>Task Id: {item.taskId}</TaskDate>

      </TaskItemContainer>
    );
  };

  return (
    <Container >
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.taskId.toString()}
        renderItem={renderTaskItem}
        contentContainerStyle={ListContainer}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={modalVisible} onRequestClose={closeModal}>
        <ModalContent>
          {currentUser && (
            <>
              <ClientInfoLabel>Client Name:</ClientInfoLabel>
              <ClientInfoText>{currentUser?.clientFirstName}</ClientInfoText>

              <ClientInfoLabel>Client Address:</ClientInfoLabel>
              <ClientInfoText>{currentUser?.clientAddress}</ClientInfoText>

              <ClientInfoLabel>Client Email:</ClientInfoLabel>
              <ClientInfoText>{currentUser?.clientEmail}</ClientInfoText>

              <ClientInfoLabel>Client Phone Number:</ClientInfoLabel>
              <ClientInfoText>{currentUser?.clientPhone}</ClientInfoText>

              <ClientInfoLabel>Client City:</ClientInfoLabel>
              <ClientInfoText>{currentUser?.clientCity}</ClientInfoText>
            </>
          )}
          <Button title="Close" onPress={closeModal} />
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Container = styled.View`

  flex: 1;
  padding: 16px;
  background-color: #f5f5f5;
`;

const ListContainer = styled.View`
  padding-bottom: 16px;
`;

const TaskItemContainer = styled.View`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
`;

const MoreInfoIcon = styled(Icon)``;

const TaskTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const TaskText = styled.Text`
  font-size: 14px;
  margin-bottom: 8px;
`;

const TaskDate = styled.Text`
  font-size: 12px;
  color: #888888;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AcceptButton = styled(Button)`
  flex: 1;
  margin-horizontal: 4px;
`;

const RejectButton = styled(Button)`
  flex: 1;
  margin-horizontal: 4px;
  background-color: red;
`;

const ModalContent = styled.View`
  background-color: #ffffff;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
`;

const ClientInfoLabel = styled.Text`
  font-weight: bold;
  margin-bottom: 8px;
`;

const ClientInfoText = styled.Text`
  margin-bottom: 16px;
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

export default OffersScreen;
