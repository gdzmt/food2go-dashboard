import React from "react";
import Grid from "@mui/material/Grid";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { TrendingMenu } from "../../components/dashboard";
import { Card, RefineListView } from "../../components";

export const DashboardPage: React.FC = () => {
  return (
    <RefineListView>
      <Grid container columns={24} spacing={2}>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8} sx={{ height: "600px" }}>
          <Card icon={<TrendingUpIcon />} title="Top 5 Products">
            <TrendingMenu trend='trendingProducts' />
          </Card>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8} sx={{ height: "600px" }}>
          <Card icon={<TrendingUpIcon />} title='Top 5 Users'>
            <TrendingMenu trend='trendingCustomers' />
          </Card>
        </Grid>
        <Grid item xs={24} sm={24} md={24} lg={8} xl={8} sx={{ height: "600px" }}>
          <Card icon={<TrendingUpIcon />} title='Top 5 Cities'>
            <TrendingMenu trend='trendingCities' />
          </Card>
        </Grid>
      </Grid>
    </RefineListView>
  );
};
