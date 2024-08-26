import { RefreshControl } from 'react-native'
import React, { useState } from 'react'

const RefreshController = ({ reFetch }: { reFetch: any }) => {
  const [refresh, setRefresh] = useState(false);

  const onRefresh = async () => {
    setRefresh(true);

    await reFetch();

    setRefresh(false);
  };

  console.log(refresh)

  return (
    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
  )
}

export default RefreshController;