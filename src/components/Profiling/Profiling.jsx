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
  ButtonDropdown,
  FormElement,
  Select,
} from "@cedcommerce/ounce-ui";
import { FiFilter } from "react-icons/fi";
import { useState } from "react";
import ProductTable from "./ProductTable";

function Profiling() {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState({});

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

  // use this function to create query from the "filterObject" object
  // "filterObject" object *MUST* be in same manner as it is in this code
  function createQuery(queryObject) {
    let query = "";

    if (Object.keys(queryObject)?.length > 0) {
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
          <ProductTable
            page={page}
            setPage={setPage}
            filterQuery={filterQuery}
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
          />
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
