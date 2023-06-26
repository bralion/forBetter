//城市数据
const cities = require("dashboard_2_7/corejs/resource/json/cityName/cities.json");
//身份数据
const provinces = require("dashboard_2_7/corejs/resource/json/cityName/provinces.json");
const cpData = require("dashboard_2_7/corejs/resource/json/cityName/cityCP.json");
let mapData = [
  {
    title: "世界地图",
    key: "world",
    value: "世界"
  },
  {
    title: "中国地图",
    key: "country",
    value: "中国",
    children: []
  }
];
let allData = [];
let codeMap = new Map();
provinces.forEach((province, index) => {
  mapData[1].children.push({
    title: province.name,
    key: province.name,
    value: "中国-" + province.name,
    children: []
  });
  codeMap.set(province.code, { index: index, name: province.name });
  allData.push(province);
});
cities.forEach((city, index) => {
  let provinceIdx = codeMap.get(city.provinceCode).index;
  let provinceName = codeMap.get(city.provinceCode).name;
  //市辖区为直辖市 不显示出来
  if (provinceIdx !== undefined && city.name !== "市辖区") {
    mapData[1].children[provinceIdx].children.push({
      title: city.name,
      key: city.name,
      value: "中国-" + provinceName + "-" + city.name
    });
  }
  allData.push(city);
});
export { mapData, allData, cpData };
