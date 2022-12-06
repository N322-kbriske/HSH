export interface Home {
  owner: User[];
  homeName: string;
  rooms: Room[];
}

export interface User {
  firstName: string;
  lastName: string;
  role: string;
}

export interface Room {
  name: string;
  accessories: Accessories[];
  roomID: string;
}

export interface Accessories {
  name: string;
  type: string;
  state: boolean;
  accessoryID: string;
  icon: string;
}

// export interface Home {
//   owner: User[];
//   homeName: string;
//   rooms: [
//     {
//       roomName: string;
//       accessories?: [];
//     }
//   ];
// }
