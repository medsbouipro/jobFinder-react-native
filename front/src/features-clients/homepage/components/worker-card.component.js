import React from "react";
import { SvgUri, SvgXml } from "react-native-svg";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import {
  WorkerrCard,
  WorkerPhoto,
  Info,
  Section,
  SectionEnd,
  Address,
  WorkerPhotoWrapper,
  CardTitle,
} from "./worker-card.styles";
import unknown from "../../../../assets/unknown.png";

export const WorkerCard = ({ worker }) => {
  const rating =
    Math.ceil(worker.workerTotalRating / worker.workerNumRates) || 0;
  const ratingArray = Array.from(new Array(Math.ceil(rating)));
  return (
    <WorkerrCard>
      <Spacer size="medium" />
      <CardTitle variant="hint">{worker.workerJob}</CardTitle>
      <WorkerPhotoWrapper>
        <WorkerPhoto
          
          source={worker.workerImgUrl ? { uri: worker.workerImgUrl } : unknown}
        />
      </WorkerPhotoWrapper>
      <Info>
        <Section>
          <Text variant="caption">Name: </Text>
          <Text variant="label">{worker.workerFirstName}</Text>
          <SectionEnd>
            {ratingArray.map((_, i) => (
              <SvgXml key={i} xml={star} width={20} height={20} />
            ))}
          </SectionEnd>
        </Section>
        <Spacer />
        <Section>
          <Text variant="caption">Address: </Text>
          <Address>{worker.workerAddress}</Address>
          <SectionEnd>
          <Text variant="caption">Experience: <Text variant="label">{worker.workerYearsOfExperience} years</Text>
 </Text>

          </SectionEnd>
        </Section>
      </Info>
    </WorkerrCard>
  );
};
