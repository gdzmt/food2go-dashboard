import React, { useEffect, useState } from 'react';
import { NumberField } from "@refinedev/mui";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useKsqlDb } from "../../../hooks/useKsqlDb/index"; 
import { Rank1Icon } from "../../icons/rank-1";
import { Rank2Icon } from "../../icons/rank-2";
import { Rank3Icon } from "../../icons/rank-3";
import { Rank4Icon } from "../../icons/rank-4";
import { Rank5Icon } from "../../icons/rank-5";
import { ReactNode } from "react";

export const TrendingMenu: React.FC = ({ trend }) => {

  const { fetch } = useKsqlDb();

  useEffect(() => {
    const refresh = setInterval(() => {
      init();
    }, 1000); 
    return () => clearInterval(refresh);
  }, []);

  const [trending, setTrending] = useState([]);

  async function init(){
    const data = await fetch(trend);
    setTrending(data);
  };

  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      {trending.map((item, index) => (
        <Stack
          key={item.NAME}
          direction="row"
          alignItems="center"
          spacing={3}
        >
          <Box sx={{ position: "relative" }}>
            <Avatar
              sx={{
                width: 50,
                height: 50,
              }}
              src={item.URL}
            />
            <Box
              sx={{
                position: "absolute",
                top: -16,
                right: -16,
              }}
            >
              {RankIcons[index + 1]}
            </Box>
          </Box>
          <Stack spacing={"2px"}>
            <Typography variant="h6">{item.NAME}</Typography>
            <NumberField
              color="text.secondary"
              options={{
                currency: "MXN",
                style: "currency",
                notation: "standard",
              }}
              value={item.TOTAL}
            />
            <Typography color="text.secondary" whiteSpace="nowrap">
              Ordered
              <Typography
                component="span"
                color="text.primary"
                whiteSpace="nowrap"
              >
                {" "}
                {item.COUNT}
                {" "}
              </Typography>
              items
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const RankIcons: Record<number, ReactNode> = {
  1: <Rank1Icon />,
  2: <Rank2Icon />,
  3: <Rank3Icon />,
  4: <Rank4Icon />,
  5: <Rank5Icon />,
};
