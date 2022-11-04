import {
  Card,
  Button,
  FlexLayout,
  TextStyles,
  PageFooter,
  BodyLayout,
  PageHeader,
} from "@cedcommerce/ounce-ui";
import { AiOutlineDown } from "react-icons/ai";
import { Doughnut, Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const lineOptions = {
    responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: "Active Compaigns",
    //   },
    // },
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      // title: {
      //   display: true,
      //   text: "Product Status",
      // },
    },
  };
  const lineData = {
    labels: ["az", "by", "cx", "dw", "e", "f", "g", "h"],
    datasets: [
      {
        label: "Dataset 1",
        data: [300, 50, 100, 50, 300, 50, 100, 50],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["az", "by", "cx", "dw"],
    datasets: [
      {
        data: [300, 50, 100, 50],
        backgroundColor: ["red", "blue", "green", "yellow"],
      },
    ],
  };
  return (
    <div className="dashboard">
      <BodyLayout>
        <PageHeader
          sticky
          title="Welcome to Twitter Connected App"
          description="Welcome. Here's what you need to know in a nutshell"
        />
        <div
          style={{
            marginTop: "2.5rem",
          }}
        >
          <Card>
            <FlexLayout
              direction="row-reverse"
              spacing="extraloose"
              halign="around"
            >
              <Card
                title="Product Status"
                action={<a href="#">Manage Products</a>}
                primaryAction={{
                  content: "Sync With Twitter",
                  type: "Primary",
                }}
                secondaryAction={{
                  content: "Import From Shopify",
                  type: "Outlined",
                }}
              >
                <Doughnut data={data} options={options} />
              </Card>
              <Card
                title="Product Status"
                action={<a href="#">Manage Products</a>}
                primaryAction={{
                  content: "Sync With Twitter",
                  type: "Primary",
                }}
                secondaryAction={{
                  content: "Import From Shopify",
                  type: "Outlined",
                }}
              >
                <Doughnut data={data} options={options} />
              </Card>
            </FlexLayout>
          </Card>
        </div>
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <Card
            title="Active Compaigns"
            action={<a href="#">View Active Compaigns</a>}
          >
            <FlexLayout halign="fill">
              <Button
                type="Outlined"
                iconAlign="right"
                icon={<AiOutlineDown />}
              >
                Overall
              </Button>
              <Button
                type="Outlined"
                iconAlign="right"
                icon={<AiOutlineDown />}
              >
                Weekly
              </Button>
            </FlexLayout>
            <Line data={lineData} options={lineOptions} />
          </Card>
        </div>
        <PageFooter>
          <TextStyles>Cedcommerce @ 2020</TextStyles>
        </PageFooter>
      </BodyLayout>
    </div>
  );
}

export default Dashboard;
