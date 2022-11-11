import {
  Card,
  FlexLayout,
  TextStyles,
  Skeleton,
  Pagination,
} from "@cedcommerce/ounce-ui";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Table, Avatar, Switch } from "antd";
import { useEffect, useState } from "react";

function ProductTable({
  page,
  setPage,
  filterQuery,
  selectedRow,
  setSelectedRow,
  selectedRowArray,
  setSelectedRowArray,
}) {
  const [count, setCount] = useState(10);
  const [totalCount, setTotalCount] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // token
  const TOKEN =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiNjM2MzcyZDgxODZlNjUzOWVkMDU5NmMyIiwicm9sZSI6ImN1c3RvbWVyIiwiZXhwIjoxNjY4MTYyMzY2LCJpc3MiOiJodHRwczpcL1wvYXBwcy5jZWRjb21tZXJjZS5jb20iLCJ0b2tlbl9pZCI6IjYzNmRlYWZlNDlkMjY0NWUyNzEwYmEyOSJ9.traP50plaAE6kyitIxHU1sqTldDLX89RQbmVSa2o2A7lzNJrV91VEsrJgrcG5TBpeVhsADlVmECIZ-Mit30kpG_W1LS4TpB_zx05EK53frEZq2ye7hHxtAXQ4B35SEQncsJuHgOS_Z0V7BHzBY3fMZGCsfNFSuzzhGi7z4P7AUWVIBFnarsZw9qEAU7YobicGWmZwrswfTpc-5xP47yPWU-_BRCupytcm-50Pz6KsjcDEelNAYSnnn1mJ7GStYpD8bBIBV90dBF7qoxROOsFGjXVNfbVn2Z9wDbgzyIxItx6GaKalIzfW0aQCsCkj3ry4sYGDZqczX8zBWonLc4zhA";

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
            status: item.items[0]?.status || item.items[1]?.status,
            inventory:
              item.type === "simple"
                ? `${item.items[0].quantity} in stock`
                : `${item.items.reduce((acc, val) => {
                    if (item["source_product_id"] === val["source_product_id"])
                      return acc + 0;
                    return acc + val.quantity;
                  }, 0)} of ${item.items.reduce((acc, val) => {
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
  }, []);

  useEffect(() => {
    console.log(selectedRow);
    const newSelectedRowArray = Object.keys(selectedRow).reduce((acc, row) => {
      return [...acc, ...selectedRow[row]];
    }, []);

    setSelectedRowArray(newSelectedRowArray);
  }, [selectedRow]);

  return (
    <div>
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
              {
                align: "left",
                dataIndex: "offerprime",
                key: "offerprime",
                title: "Offer Prime",
                width: 150,
                render: (_, record) => {
                  return (
                    <FlexLayout
                      direction="column"
                      halign="left"
                      spacing="loose"
                    >
                      <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={(e) => console.log(e, record.key)}
                      />
                      <TextStyles>{record.inventory}</TextStyles>
                    </FlexLayout>
                  );
                },
              },
            ]}
            dataSource={products}
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedRowArray,
              onChange: (e) => {
                setSelectedRow((prevSelectedRow) => {
                  return { ...prevSelectedRow, [page]: e };
                });
              },
            }}
          />
        ) : (
          <Skeleton line={3} rounded="0%" type="line" />
        )}
      </Card>
      {products?.length !== 0 && (
        <Card>
          <Pagination
            countPerPage={count}
            currentPage={page}
            onCountChange={(e) => {
              setCount(e);
              setPage(1);
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
            totalPages={Math.ceil(totalCount / count) || 1}
            totalitem={totalCount || 0}
          />
        </Card>
      )}
    </div>
  );
}

export default ProductTable;
