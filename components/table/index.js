import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';

export default function TableCustom({...props}) {
  const {tableHeader, tableData} = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {loading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <DataTable>
            <DataTable.Header>
              {tableHeader.map((items, index) => (
                <DataTable.Title key={index} className="w-24">
                  {items.title}
                </DataTable.Title>
              ))}
            </DataTable.Header>
          </DataTable>
          <ScrollView>
            <DataTable>
              {tableData?.map((items, index) => (
                <DataTable.Row
                  key={index}
                  className={index % 2 && `bg-zinc-200`}>
                  <DataTable.Cell>{items.rules}</DataTable.Cell>
                  <DataTable.Cell>{items.type}</DataTable.Cell>
                  <DataTable.Cell>{items.score}</DataTable.Cell>
                  <DataTable.Cell>{items.typeScore}</DataTable.Cell>
                  <DataTable.Cell>{items.permision}</DataTable.Cell>
                  <DataTable.Cell></DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </ScrollView>
          <DataTable>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </>
      )}
    </>
  );
}
