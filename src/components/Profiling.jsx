import {
  Card,
  Button,
  FlexLayout,
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
  TextField,
  Filter,
  Tag,
  Skeleton,
  ButtonDropdown,
  FormElement,
  Pagination,
  Select,
} from "@cedcommerce/ounce-ui";
import { FiFilter } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Table, Avatar } from "antd";

function Profiling() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  // filters
  const [filterObject, setFilterObject] = useState({});
  const [filterQuery, setFilterQuery] = useState("");
  const [tagsArray, setTagsArray] = useState([]);

  // use the "filterField" array to add or delete filter fields
  // "name" key is the name you want to show above input field
  // "filter" key contains query with number seperated by "-" (dash)
  const filterFields = [
    {
      title: "Product Status",
      filter: "item.status-1",
      options: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
        {
          label: "Incomplete",
          value: "Incomplete",
        },
        {
          label: "Not Listed",
          value: "Not_listed",
        },
        {
          label: "Uploaded",
          value: "Uploaded",
        },
        {
          label: "Available for Offer",
          value: "Available for Offer",
        },
      ],
    },
    {
      title: "Brand",
      filter: "brand-1",
      options: [
        {
          label: "Sterling Ltd",
          value: "Sterling Ltd",
        },
        {
          label: "Home Sweet Home",
          value: "Home Sweet Home",
        },
        {
          label: "Company 123",
          value: "Company 123",
        },
        {
          label: "randomStoreCed",
          value: "randomStoreCed",
        },
        {
          label: "Rustic LTD",
          value: "Rustic LTD",
        },
        {
          label: "twitter_demo7",
          value: "twitter_demo7",
        },
        {
          label: "partners-demo",
          value: "partners-demo",
        },
      ],
    },
    {
      title: "Product Type",
      filter: "product_type-3",
      options: [
        {
          label: "Necklace",
          value: "Necklace",
        },
        {
          label: "Indoor",
          value: "Indoor",
        },
        {
          label: "Earrings",
          value: "Earrings",
        },
        {
          label: "Outdoor",
          value: "Outdoor",
        },
        {
          label: "Bracelet",
          value: "Bracelet",
        },
      ],
    },
  ];
  // token
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY3OTgwNTI0LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNmIyNGFjMDgxMmZkM2I1ZjQ2NWYyNSJ9.NcfOV372emwmCCPuoQ1HRKEy7sJ1HTO70GKWoepQJP2sShdlCTCzDQr3gND3LNhwE_Naco6V1Ab_7p8aH0-0dCd_vx91kzFYbgTX7m6KcKqVNkxuwhY45VLeYl2pQ0_-mqvPLM1DcGKkSqiKZ7MGk_qrfVwZUpo4yy7wRG_foMyFSnWOHNj42ya9PGjFsxztnc24hzNKpDz6lCs6O6N_6--ue7h8_tiUwgFiV8vUr7GXtxVvDU08r3gRXtj5pNA4wDo_OsWv7YS1ZwpXf_7AdVYimqVjHtpsrLgpumL6FOyWLY8_TOsZSBKjMPGQT1URdMtoEde9Q_Z-LUqneQdx0g";

  // console.log(filterObject);

  useEffect(() => {
    // we can keep the token in env variable for more security
    setIsLoading(true);
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?activePage=${page}&count=${count}&productOnly=true${filterQuery}`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization: `Bearer ${TOKEN}`,
          "Ced-Source-Id": 889,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 890,
          "Ced-Target-Name": "twitter",
        },
      }
    )
      .then((resp) => resp.json())
      .then((allData) => {
        // console.log(allData);
        let newData = allData?.data?.rows?.map((item) => {
          return {
            key: item._id["$oid"],
            name: item["title"],
            sku:
              item["source_product_id"] === item.items[0]["source_product_id"]
                ? item.items[0].sku
                : "NA",
            status: item.items[0].status,
            inventory: `${item.items.reduce((acc, val) => {
              if (item["source_product_id"] === val["source_product_id"])
                return acc + 0;
              return acc + val.quantity;
            }, 0)} in ${item.items.reduce((acc, val) => {
              if (item["source_product_id"] === val["source_product_id"])
                return acc + 0;
              return acc + 1;
            }, 0)} variant`,
            img: item["main_image"],
          };
        });
        setProducts(newData);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

    const checkBox = JSON.parse(localStorage.getItem("checkBox"));

    if (checkBox) {
      setSelectedRow(checkBox[page]);
      return;
    }
    setSelectedRow([]);
  }, [page, count, filterQuery]);

  useEffect(() => {
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getProductsCount?activePage=1&count=10&productOnly=true&target_marketplace=eyJtYXJrZXRwbGFjZSI6ImFsbCIsInNob3BfaWQiOm51bGx9`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization: `Bearer ${TOKEN}`,
          "Ced-Source-Id": 889,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 890,
          "Ced-Target-Name": "twitter",
        },
      }
    )
      .then((resp) => resp.json())
      .then((data) => setTotalCount(data.data?.count))
      .catch((err) => console.log(err));

    // fetch(
    //   "https://multi-account.sellernext.com/home/public/connector/source/getFilterAttributes",
    //   {
    //     method: "POST",
    //     headers: {
    //       appCode:
    //         "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
    //       appTag: "twitter_ads",
    //       Authorization: `Bearer ${TOKEN}`,
    //       "Ced-Source-Id": 889,
    //       "Ced-Source-Name": "shopify",
    //       "Ced-Target-Id": 890,
    //       "Ced-Target-Name": "twitter",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       source: {
    //         shopId: 889,
    //         marketplace: "shopify",
    //       },
    //     }),
    //   }
    // )
    //   .then((resp) => resp.json())
    //   .then(console.log)
    //   .catch((err) => console.log(err));
  }, []);

  // use this function to create query from the "filterObject" object
  // "filterObject" object *MUST* be in same manner as it is in this code
  function createQuery(queryObject) {
    let query = "";

    if (Object.keys(queryObject).length > 0) {
      Object.keys(queryObject)?.forEach((key) => {
        if (key === "title or sku") {
          if (queryObject[key] === "") return;
          query += `&or_filter[title][3]=${queryObject[key]}&or_filter[items.sku][3]=${queryObject[key]}`;
        } else {
          const splitKey = key.split("-");
          query += `&filter[${splitKey[0]}][${splitKey[1]}]=${queryObject[key]}`;
        }
      });
    }

    return query;
  }
  const handleChange = (value, field) => {
    setFilterObject({ ...filterObject, [field.filter]: value });
  };

  const handleApply = () => {
    const newQuery = createQuery(filterObject);
    setPage(1);
    setFilterQuery(newQuery);

    const tags = Object.keys(filterObject).filter((key) => {
      return filterObject[key] !== "";
    });

    const modifiedTags = tags.map((key) => {
      const splitKey = key.split("-")[0].split(".");
      return [
        `${splitKey[1]?.toUpperCase() || splitKey[0]?.toUpperCase()} : ${
          filterObject[key]
        }`,
        key,
      ];
    });

    setTagsArray(modifiedTags);
  };
  console.log(tagsArray);
  const handleResetFilter = () => {
    setFilterObject({});
    setFilterQuery("");
    setTagsArray([]);
  };

  const removeFilter = (key) => {
    const { [key]: _, ...rest } = filterObject;

    const newQuery = createQuery(rest);

    const newTags = tagsArray.filter((tag) => tag[1] !== key);

    if (Object.keys(rest).length === 0) {
      setFilterQuery("");
    }

    setPage(1);
    setFilterObject(rest);
    setFilterQuery(newQuery);
    setTagsArray(newTags);
  };

  const handleSearchChange = (value) => {
    setFilterObject({ ...filterObject, "title or sku": value });
  };

  return (
    <div className="dashboard">
      <BodyLayout>
        <PageHeader
          sticky
          title="Welcome to Twitter Connected App Profiling"
          description="Welcome. Here's what you need to know in a nutshell"
        />
        <div
          style={{
            marginTop: "7rem",
          }}
        >
          <Card>
            <FlexLayout spacing="extraloose" halign="fill">
              <TextStyles type="Heading">Product List</TextStyles>
              <FlexLayout spacing="loose">
                <Button type="Primary">Sync With Twitter</Button>
                <Button type="Outlined">Import From Shopify</Button>
              </FlexLayout>
            </FlexLayout>
          </Card>
          {tagsArray.length !== 0 && (
            <Card>
              <FlexLayout spacing="loose">
                {tagsArray.map((key, i) => {
                  return (
                    <Tag
                      key={i}
                      destroy={() => {
                        removeFilter(key[1]);
                      }}
                    >
                      {key[0]}
                    </Tag>
                  );
                })}
              </FlexLayout>
            </Card>
          )}
          <Card>
            <FlexLayout halign="fill">
              <FormElement>
                <TextField
                  value={filterObject["title or sku"] || ""}
                  placeHolder="Search By Title or SKU"
                  prefix={
                    <svg
                      fill="none"
                      height="20"
                      stroke="#c3c3c3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" x2="16.65" y1="21" y2="16.65" />
                    </svg>
                  }
                  onChange={(e) => handleSearchChange(e)}
                  onEnter={handleApply}
                />
              </FormElement>

              <FlexLayout halign="fill" spacing="loose">
                <Filter
                  button="Filter"
                  icon={<FiFilter />}
                  filters={filterFields.map((field) => {
                    const { filter, title, options } = field;
                    return {
                      children: (
                        <>
                          {/* <TextField
                            id={filter}
                            value={filterObject[field.filter] || ""}
                            onChange={(e) => handleChange(e, field)}
                          /> */}
                          <Select
                            placeholder={`Select ${title}`}
                            options={options}
                            value={filterObject[filter]}
                            onChange={(e) => handleChange(e, field)}
                          />
                        </>
                      ),
                      name: title,
                    };
                  })}
                  heading="Filter By"
                  type="Outlined"
                  onApply={handleApply}
                  resetFilter={handleResetFilter}
                  disableApply={
                    Object.keys(filterObject).length === 0 ? true : false
                  }
                  disableReset={
                    Object.keys(filterObject).length === 0 ? true : false
                  }
                />

                <ButtonDropdown
                  type="Outlined"
                  list={[
                    {
                      icon: (
                        <svg
                          fill="none"
                          height="20"
                          viewBox="0 0 30 30"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.5 15H22.5L18.75 26.25L11.25 3.75L7.5 15H2.5"
                            stroke="#707070"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          />
                        </svg>
                      ),
                      label: "Dropdown Item 1",
                      onClick: function noRefCheck() {},
                    },
                    {
                      icon: (
                        <svg
                          fill="none"
                          height="20"
                          viewBox="0 0 30 30"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.5 15H22.5L18.75 26.25L11.25 3.75L7.5 15H2.5"
                            stroke="#707070"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          />
                        </svg>
                      ),
                      label: "Dropdown Item 2",
                      onClick: function noRefCheck() {},
                    },
                    {
                      icon: (
                        <svg
                          fill="none"
                          height="20"
                          viewBox="0 0 30 30"
                          width="20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M27.5 15H22.5L18.75 26.25L11.25 3.75L7.5 15H2.5"
                            stroke="#707070"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                          />
                        </svg>
                      ),
                      label: "Dropdown Item 3",
                      onClick: function noRefCheck() {},
                    },
                  ]}
                  title="More Actions"
                />
              </FlexLayout>
            </FlexLayout>
          </Card>
          <Card>
            {!isLoading && products?.length !== 0 ? (
              <Table
                columns={[
                  {
                    align: "left",
                    dataIndex: "name",
                    key: "name",
                    title: " Product Name",
                    render: (text, record) => {
                      return (
                        <FlexLayout halign="left" spacing="loose">
                          <Avatar src={record.img} />
                          <TextStyles>{text}</TextStyles>
                        </FlexLayout>
                      );
                    },
                    width: 500,
                  },
                  {
                    align: "left",
                    dataIndex: "sku",
                    key: "sku",
                    title: "SKU",
                    width: 100,
                  },
                  {
                    align: "center",
                    dataIndex: "status",
                    key: "status",
                    title: "Status",
                    width: 100,
                  },
                  {
                    align: "center",
                    dataIndex: "inventory",
                    key: "inventory",
                    title: "Inventory",
                    width: 200,
                  },
                ]}
                dataSource={products}
                pagination={false}
                rowSelection={{
                  selectedRowKeys: selectedRow,
                  onChange: (e) => {
                    setSelectedRow(e);
                    const checkBox = JSON.parse(
                      localStorage.getItem("checkBox")
                    );
                    localStorage.setItem(
                      "checkBox",
                      JSON.stringify({ ...checkBox, [page]: e })
                    );
                  },
                }}
              />
            ) : (
              <Skeleton line={3} rounded="0%" type="line" />
            )}
          </Card>
          ; ; ;
          {products?.length !== 0 && (
            <Card>
              <Pagination
                countPerPage={count}
                currentPage={page}
                onCountChange={(e) => {
                  setCount(e);
                  setPage(1);
                  sessionStorage.removeItem("checkBox");
                }}
                onEnter={(e) => {
                  if (e > 0) setPage(e);
                }}
                onNext={() => {
                  if (page >= Math.ceil(totalCount / count)) {
                    setPage(Math.ceil(totalCount / count));
                    return;
                  }
                  setPage((prevPage) => prevPage + 1);
                }}
                onPrevious={() => {
                  if (page <= 1) {
                    setPage(1);
                    return;
                  }
                  setPage((prevPage) => prevPage - 1);
                }}
                optionPerPage={[
                  {
                    label: "10",
                    value: "10",
                  },
                  {
                    label: "20",
                    value: "20",
                  },
                  {
                    label: "50",
                    value: "50",
                  },
                  {
                    label: "100",
                    value: "100",
                  },
                ]}
                totalPages={Math.ceil(totalCount / count)}
                totalitem={totalCount}
              />
            </Card>
          )}
        </div>
        <PageFooter>
          <TextStyles>Cedcommerce @ 2022</TextStyles>
          <TextStyles>Coded by Zeeshan A. Khan</TextStyles>
        </PageFooter>
      </BodyLayout>
    </div>
  );
}

export default Profiling;
