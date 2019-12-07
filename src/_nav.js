export default {
  items: [
    {
      name: "Kasir",
      url: "/kasir",
      icon: "icon-speedometer"
      // badge: {
      //   variant: "info",
      //   text: "NEW"
      // }
    },
    {
      divider: true
    },
    // {
    //   title: true,
    //   name: "Data",
    //   wrapper: {
    //     // optional wrapper object
    //     element: "", // required valid HTML5 element tag
    //     attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
    //   },
    //   class: "" // optional class names space delimited list for title item ex: "text-center"
    // },
    {
      name: "Tabel",
      url: "/tables/barang",
      icon: "icon-drop",
      children: [
        {
          name: "Barang",
          url: "/tabel/barang"
        },
        {
          name: "Pembeli",
          url: "/tabel/pembeli"
        },
        {
          name: "Supllier",
          url: "/tabel/supplier"
        }
      ]
    },
    {
      name: "Transaksi",
      url: "/transaksi/beli",
      icon: "icon-star",
      children: [
        {
          name: "Order",
          url: "/transaksi/beli"
        },
        {
          name: "Jual",
          url: "/transaksi/jual"
        }
      ]
    },
    // {
    //   title: true,
    //   name: "Jurnal",
    //   wrapper: {
    //     element: "",
    //     attributes: {}
    //   }
    // },
    {
      name: "Jurnal",
      url: "/base",
      icon: "icon-puzzle",
      children: [
        {
          name: "Breadcrumbs",
          url: "/base/breadcrumbs",
          icon: "icon-puzzle"
        },
        {
          name: "Cards",
          url: "/base/cards",
          icon: "icon-puzzle"
        }
      ]
    },

    {
      divider: true
    },
    {
      title: true,
      name: "Extras"
    },
    {
      name: "Pages",
      url: "/pages",
      icon: "icon-star",
      children: [
        {
          name: "Login",
          url: "/login",
          icon: "icon-star"
        },
        {
          name: "Register",
          url: "/register",
          icon: "icon-star"
        },
        {
          name: "Error 404",
          url: "/404",
          icon: "icon-star"
        },
        {
          name: "Error 500",
          url: "/500",
          icon: "icon-star"
        }
      ]
    }
    // {
    //   name: "Disabled",
    //   url: "/dashboard",
    //   icon: "icon-ban",
    //   attributes: { disabled: true }
    // },
    // {
    //   name: "Download CoreUI",
    //   url: "https://coreui.io/react/",
    //   icon: "icon-cloud-download",
    //   class: "mt-auto",
    //   variant: "success",
    //   attributes: { target: "_blank", rel: "noopener" }
    // },
    // {
    //   name: "Try CoreUI PRO",
    //   url: "https://coreui.io/pro/react/",
    //   icon: "icon-layers",
    //   variant: "danger",
    //   attributes: { target: "_blank", rel: "noopener" }
    // }
  ]
};
