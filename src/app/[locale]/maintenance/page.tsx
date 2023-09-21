"use client";

import { useI18n } from "@/i18n/client";
import { Flex, Text } from "@ledgerhq/react-ui";
import { CloseMedium } from "@ledgerhq/react-ui/assets/icons";
import styled from "styled-components";
import styles from "./page.module.css";

const LogoContainer = styled(Flex)`
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.error.c50};
  height: 50px;
  width: 50px;
`;

export default function ApplicationDisabled() {
  const { t } = useI18n();

  return (
    <div className={styles.main}>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        flex={1}
        data-testid="application-disabled-container"
      >
        <LogoContainer data-testid="application-disabled-logo">
          <CloseMedium size={32} color="background.main" />
        </LogoContainer>
        <Text
          variant="h4"
          fontWeight="medium"
          color="neutral.c100"
          mt={10}
          textAlign="center"
          data-testid="application-disabled-title"
        >
          {t("applicationDisabled.title")}
        </Text>
        <Text
          variant="bodyLineHeight"
          fontWeight="medium"
          color="neutral.c80"
          mt={10}
          textAlign="center"
          data-testid="application-disabled-subtitle"
        >
          {t("applicationDisabled.desc")}
        </Text>
      </Flex>
    </div>
  );
}
