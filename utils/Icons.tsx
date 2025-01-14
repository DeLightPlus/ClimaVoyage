
import React from "react";
import type { PropsWithChildren } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

// Define IconProps using `type` with optional `size`
type IconProps = {
    name: string;
    size?: number; // size is optional, will default to 30 if not passed
    color?: string; // Optional color property
  };

//   <Icon name="google" size={32} color = "white" />
  

  const Icons = ({ name, size = 30, color = 'white' }: IconProps) => {
    
    switch (name) {
      case "google":
        return <Icon name="google" size={size} color={color} />
        break;

      case "facebook":
        return <Icon name="facebook" size={size} color={color} />
        break;

      case "apple":
        return <Icon name="apple" size={size} color={color} />
        break;

      case "shopping-basket":
        return <Icon name="shopping-basket" size={size} color={color} />
        break;

      case "plus":
          return <Icon name="plus-square" size={size} color={color} />
          break;

      case "play":
          return <Icon name="play" size={30} color="white" />
          break;

      case "stop":
          return <Icon name="stop" size={30} color="white" />
          break;

      case "pause":
          return <Icon name="pause" size={30} color="white" />
          break;
      
      case "rename":
          return <Icon name="rename" size={30} color="white" />
          break;
      
      case "delete":
          return <Icon name="delete" size={30} color="white" />
          break;

      default:
          return <Icon name="pageline" size={30} color="white" />
          break;
    }
}

export default Icons;
