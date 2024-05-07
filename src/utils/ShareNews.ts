 import { Share } from "react-native";
 const onShare = async (link: string | undefined) => {
    try {
      const result = await Share.share({
        message: `Check out this news: ${link}`,
        url: link,
      });

    } catch (error) {
      console.error('Error during sharing: ' + error);
    }
  };

  export default onShare;