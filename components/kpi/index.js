import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment, useCallback, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RulesManager from './rules';
import ScoreManager from './score';
import Statistical from './statistical';
import StatisticMember from './statistical_member';
import MainBoard from './MainBoard';
import Members from './group/members';
import Group from './group';
import AddMember from './group/members/AddMember';
import RuleList from './rules/rule_list';
import AddRule from './rules/rule_list/AddRule';

const Stack = createNativeStackNavigator();

export default function Kpi() {
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="mainboard">
        <Stack.Screen
          options={{headerShown: false}}
          name="mainboard"
          component={MainBoard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="score"
          component={ScoreManager}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="statistical"
          component={Statistical}
        />
        {/* quản lý thành viên */}
        <Stack.Screen
          options={{headerShown: false}}
          name="group"
          component={Group}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="members"
          component={Members}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="add-member"
          component={AddMember}
        />
        {/* quản lý rules */}
        <Stack.Screen
          options={{headerShown: false}}
          name="rules"
          component={RulesManager}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="rule-list"
          component={RuleList}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="add-rule"
          component={AddRule}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="statistical_member"
          component={StatisticMember}
        />
      </Stack.Navigator>
    </Fragment>
  );
}
