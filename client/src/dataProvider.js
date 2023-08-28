import jsonServerProvider from "ra-data-json-server";

const addUserProfileOverrides = (dataProvider) => ({
  ...dataProvider,
  getUserProfile() {
    const profile = localStorage.getItem("userProfile");
    if (!profile) {
      return Promise.resolve({ data: {} });
    }
    const data = JSON.parse(profile);
    console.log("getUserProfile", data);
    return Promise.resolve({ data });
  },
  async updateUserProfile({ data }) {
    const avatar = await (data.avatar.rawFile instanceof File
      ? convertFileToBase64(data.avatar)
      : data.avatar);

    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        ...data,
        id: "unique_id",
        avatar
      })
    );
    return Promise.resolve({ data });
  }
});

const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;

    reader.readAsDataURL(file.rawFile);
  });

export default addUserProfileOverrides(
  jsonServerProvider("https://jsonplaceholder.typicode.com")
);