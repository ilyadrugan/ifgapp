import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { PushAction } from '../../firebase/firebase';
import { useFirebaseMessaging } from '../../firebase/use-firebase-messaging';
import React from 'react';

export const FirebaseComponent: FC = () => {

  const navigation = useNavigation<any>();

  useFirebaseMessaging(onPushAction, needToShow);

  function onPushAction(action: PushAction) {
    // console.log('onPushAction', action);
    switch (action.action) {
      // case PushActionType.NavigateToContractorChat: {
      //   const data = action.data as NavigateToContractorChatData;
      //   dispatch(ContractorCardSlice.SetContractorRevisionId({
      //     id: data.contractorId,
      //     // revisionId: data.revisionId,
      //   }));
      //   if (data.role === 1) {
      //     navigation.navigate('Main', { screen: 'Company', params: { openChat: true } });
      //   } else {
      //     navigation.navigate('Main');
      //     navigation.navigate('ContractorCard', { openChat: true });
      //   }
      //   break;
      // }
      // case PushActionType.NavigateToRequestChat: {
      //   const data = action.data as NavigateToRequestChatData;
      //   dispatch(ProjectRequestCardSlice.ClearCard());
      //   navigation.navigate('Main');
      //   navigation.navigate('RequestCard', { id: data.requestId, openChat: true });
      //   break;
      // }
      // case PushActionType.NavigateToCompany: {
      //   const data = action.data as NavigateToCompanyData;
      //   dispatch(ContractorCardSlice.SetContractorRevisionId({
      //     id: data.contractorId,
      //     // revisionId: data.revisionId,
      //   }));
      //   if (data.toBilling)
      //     dispatch(ContractorCardSlice.SetActiveTab('Billing'));
      //   navigation.navigate('ContractorCard', { canGoBack: true });
      //   break;
      // }
      // case PushActionType.NavigateToRequest: {
      //   const data = action.data as NavigateToRequestCard;
      //   dispatch(ProjectRequestCardSlice.ClearCard());
      //   navigation.navigate('Main');
      //   navigation.navigate('RequestCard', { id: data.requestId });
      //   break;
      // }
    }
  }

  function needToShow(action: PushAction): boolean {
    // console.log('needToShow', action);

    switch (action.action) {
      // case PushActionType.NavigateToContractorChat: {
      //   const data = action.data as NavigateToContractorChatData;
      //   if (state.contractorCard.isChatOpen && state.contractorCard.card?.contractorId == data.contractorId) {
      //     return false;
      //   }
      //   return true;
      // }
      // case PushActionType.NavigateToRequestChat: {
      //   const data = action.data as NavigateToRequestChatData;
      //   if (state.projectRequestCard.isChatOpen && state.projectRequestCard.card?.id == data.requestId) {
      //     return false;
      //   }
      //   return true;
      // }
    }
    return true;
  }

  return (<>
  </>);
};
