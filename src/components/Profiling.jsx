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
  Grid,
  Tag,
  ButtonDropdown,
  FormElement,
  Pagination,
} from "@cedcommerce/ounce-ui";
import { FiFilter } from "react-icons/fi";
import { useState, useEffect } from "react";

function Profiling() {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(10);
  const [products, setProducts] = useState([]);
  // filters
  const [filterObject, setFilterObject] = useState({});
  const [filterQuery, setFilterQuery] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  // use this array to add or delete filter fields
  // "name" key is the name you want to show above input field
  // "filter" key contains query with number seperated by "-" (dash)
  const filterFields = [
    { name: "Product Name", filter: "title-3" },
    { name: "SKU", filter: "items.sku-3" },
    { name: "Status", filter: "items.status-1" },
  ];

  useEffect(() => {
    // we can keep the token in env variable for more security
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?activePage=${page}&count=${count}&productOnly=true${filterQuery}`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY3ODk4MTUzLCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjllMmU5OTk0MjYyNDE3NTZjMzg4MiJ9.JK44yy7dlyp7ay4QH5m7xWhPN1EREH7wP-49KAyGkncvq3STmPf16xLWNVPGGf3IADqZYXpqy_gLT6rC2XP2lTF2gZpd148nwY42gmcv96H-XMCKClwC-mc1_i_ITtllHssT2ge2bCLxWJSL6MgLeh81KwhPgLyAExrWzVvJlkDcUsPvQCCV9IO5F11egqZ8lNnjSnp-vYdJ2o2NPg-gSCrX2M_5Zc7maCEOJgEhinYMjVaQ8swVyTb1YAbbJdviqPB3KQ9lZVdbQ-Tx3r8g1S2YRUFBEvcwzlWSZvnMncgv7Ul4_FAB0wxFo52kTrj9eLnUmWDIUjeFJtHB_pDO6A",
          "Ced-Source-Id": 889,
          "Ced-Source-Name": "shopify",
          "Ced-Target-Id": 890,
          "Ced-Target-Name": "twitter",
        },
      }
    )
      .then((resp) => resp.json())
      .then((allData) => {
        let newData = allData?.data?.rows?.map((item) => {
          return {
            key: item._id["$oid"],
            name: item.title,
            sku: item.items[0].sku,
            status: item.items[0].status,
            inventory:
              item.items[0].quantity === 0
                ? "Out of Stock"
                : item.items[0].quantity,
          };
        });
        setProducts(newData);
      })
      .catch((err) => console.log(err));
  }, [page, count, filterQuery]);

  function createQuery(queryObject) {
    let query = "";

    if (Object.keys(queryObject).length > 0) {
      Object.keys(queryObject)?.forEach((key) => {
        const splitKey = key.split("-");

        query += `&filter[${splitKey[0]}][${splitKey[1]}]=${queryObject[key]}`;
      });
    }

    return query;
  }

  console.log(filterObject);

  const handleChange = (value, field) => {
    setFilterObject({ ...filterObject, [field.filter]: value });
  };

  const handleApply = () => {
    const newQuery = createQuery(filterObject);
    setPage(1);
    setFilterQuery(newQuery);

    const tags = Object.keys(filterObject).filter(
      (key) => filterObject[key] !== ""
    );

    setTagsArray(tags);
  };

  const handleResetFilter = () => {
    setFilterObject({});
    setFilterQuery("");
  };

  const removeFilter = (key) => {
    const { [key]: _, ...rest } = filterObject;

    const newQuery = createQuery(rest);

    const newTags = tagsArray.filter((tag) => tag !== key);

    if (Object.keys(rest).length === 0) {
      setFilterQuery("");
    }

    setPage(1);
    setFilterObject(rest);
    setFilterQuery(newQuery);
    setTagsArray(newTags);
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
            marginTop: "3rem",
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
                  const splitKey = key.split("-")[0].split(".");
                  return (
                    <Tag
                      key={i}
                      destroy={() => {
                        removeFilter(key);
                      }}
                    >
                      {splitKey[1] || splitKey[0]}
                    </Tag>
                  );
                })}
              </FlexLayout>
            </Card>
          )}

          <Card>
            <FlexLayout halign="fill">
              <TextField
                placeHolder="Search Products"
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
              />

              <FlexLayout halign="fill" spacing="loose">
                <Filter
                  button="Filter"
                  icon={<FiFilter />}
                  filters={filterFields.map((field) => {
                    const { filter, name } = field;
                    return {
                      children: (
                        <>
                          <FormElement>
                            <TextField
                              id={filter}
                              value={filterObject[field.filter] || ""}
                              onChange={(e) => handleChange(e, field)}
                            />
                          </FormElement>
                        </>
                      ),
                      name,
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
            <Grid
              columns={[
                {
                  align: "left",
                  dataIndex: "name",
                  key: "name",
                  title: " Product Name",
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
                  width: 100,
                },
              ]}
              dataSource={products}
              rowSelection={{
                onChange: (e) => {
                  console.log(e);
                },
              }}
            />
          </Card>
          {products.length !== 0 && (
            <Card>
              <Pagination
                countPerPage={count}
                currentPage={page}
                onCountChange={(e) => setCount(e)}
                onEnter={(e) => {
                  if (e > 0) setPage(e);
                }}
                onNext={() => setPage((prevPage) => prevPage + 1)}
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
                totalPages={20}
                totalitem={200}
              />
            </Card>
          )}
        </div>
        <PageFooter>
          <TextStyles>Cedcommerce @ 2022</TextStyles>
          <TextStyles>Coded by Zeeshan</TextStyles>
        </PageFooter>
      </BodyLayout>
    </div>
  );
}

export default Profiling;
