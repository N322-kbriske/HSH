export interface Home {
  owner: [
    {
      name: string;
      role: string;
    }
  ];
  homeName: string;
  rooms: [
    {
      roomName: string;
      accessories: [
        {
          accessoryName: string;
          accessoryType: string;
          accessoryState: boolean;
        }
      ];
    }
  ];
}
