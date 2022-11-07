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
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    // we can keep the token in env variables
    fetch(
      `https://multi-account.sellernext.com/home/public/connector/product/getRefineProducts?activePage=${page}&count=${count}&productOnly=true${filterQuery}`,
      {
        headers: {
          appCode:
            "eyJzaG9waWZ5Ijoic2hvcGlmeV90d2l0dGVyIiwibWFnZW50byI6Im1hZ2VudG9fdHdpdHRlciIsImJpZ2NvbW1lcmNlIjoiYmlnY29tbWVyY2VfdHdpdHRlciIsIndvb2NvbW1lcmNlIjoid29vY29tbWVyY2VfdHdpdHRlciIsInR3aXR0ZXIiOiJ0d2l0dGVyIn0=",
          appTag: "twitter_ads",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY3ODMxMjc4LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNjhkZGFlMzVmNTU1NDYzYjRhNjkwMiJ9.OSktME4OdVv9lbiOnYFM5ZO-C3mft3bbrCYaGclv6thgKO30iIjk86Q-pWwetmT88EgHuLZ_xqWYHfc4ytJHsU5dGLnQcEgNzYgMvKOpSx0SA_joMYUGEVRIL-X1iy4KefIBLddBmKVeMsiU79lpouGxpgRvRFt-XNSSx_IvVtM2hdGPW4acnnGSXdDXSlhIcT8KUMhWYguJyXp6RTfZppvTyHW_2F4M8rugSlZtZRegFj3St8kic3s3vVb6ecm2MoOh_pA6G3RbdXNyZrJo_8zdp790AgYSVjMbzbuOHg4NNraDu8emGFxsF6GfvO9mXrEeL7ERE8X9CNF4Hk3o_w",
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

  const handleChange = (value, name) => {
    setFilterObject({ ...filterObject, [name]: value });
  };

  const handleApply = () => {
    const newQuery = createQuery(filterObject);
    setPage(1);
    setFilterQuery(newQuery);
    setIsFilterApplied(true);
  };

  const handleResetFilter = () => {
    setFilterObject({});
    setFilterQuery("");
  };

  const removeFilter = (key) => {
    const { [key]: _, ...rest } = filterObject;
    console.log(rest);

    const newQuery = createQuery(rest);
    console.log(newQuery);

    if (Object.keys(rest).length === 0) {
      setFilterQuery("");
      setIsFilterApplied(false);
    }

    setPage(1);
    setFilterObject(rest);
    setFilterQuery(newQuery);
    setIsFilterApplied(true);
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

          {isFilterApplied && Object.keys(filterObject).length !== 0 && (
            <Card>
              <FlexLayout spacing="loose">
                {Object.keys(filterObject)?.map((key, i) => {
                  const splitKey = key.split("-");
                  return (
                    <Tag
                      key={i}
                      destroy={() => {
                        removeFilter(key);
                        handleApply();
                      }}
                    >
                      {splitKey[0]}
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
                  filters={[
                    {
                      children: (
                        <>
                          <FormElement>
                            <TextField
                              id="title"
                              value={filterObject["title-3"] || ""}
                              onChange={(e) => handleChange(e, "title-3")}
                            />
                          </FormElement>
                        </>
                      ),
                      name: "Product Name",
                    },
                    {
                      children: (
                        <>
                          <FormElement>
                            <TextField
                              id="items.sku"
                              value={filterObject["items.sku-3"] || ""}
                              onChange={(e) => handleChange(e, "items.sku-3")}
                            />
                          </FormElement>
                        </>
                      ),
                      name: "SKU",
                    },
                    {
                      children: (
                        <>
                          <FormElement>
                            <TextField
                              id="items.status"
                              value={filterObject["items.status-1"] || ""}
                              onChange={(e) =>
                                handleChange(e, "items.status-1")
                              }
                            />
                          </FormElement>
                        </>
                      ),
                      name: "Status",
                    },
                  ]}
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
                  if (page <= 0) {
                    setPage(0);
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
          <TextStyles>Cedcommerce @ 2020</TextStyles>
        </PageFooter>
      </BodyLayout>
    </div>
  );
}

export default Profiling;
