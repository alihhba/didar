export default [
  {
    name: "books",
    meta: { label: "کتاب‌ها", icon: "book" },
    identifier: "books",
    list: "/books",
    show: "/books/:id",
  },
  {
    name: "podcasts",
    meta: { label: "پادکست ها", icon: "podcast" },
    identifier: "podcasts",
    list: "/podcasts",
    show: "/podcasts/:id",
  },
];
