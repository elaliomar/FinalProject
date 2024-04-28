 import { Share } from "react-native";
 const onShare = async (link: string | undefined) => {
    try {
      const result = await Share.share({
        message: `Check out this news: ${link}`,
        url: link,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type: ' + result.activityType);
        } else {
          console.log('Shared');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Dismissed');
      }
    } catch (error) {
      console.error('Error during sharing: ' + error);
    }
  };

  export default onShare;