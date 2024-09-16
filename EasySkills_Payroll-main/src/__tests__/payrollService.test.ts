import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { GetPayrollsParams, Payslip, getPayrolls } from "../api/payrollService";
import mockPayrollResponse from "../../__mocks__/payrollResponse.json";

axios.defaults.baseURL = "http://localhost:3000";
const mock = new MockAdapter(axios);
describe("getPayrolls", () => {
  test("should return payroll data with correct format and content", async () => {
    mock.onGet("/payrolls").reply(200, mockPayrollResponse);

    const params: GetPayrollsParams = {
      isDetailedMode: false,
      maxResults: 30,
      month: "2024-06",
      page: 1,
      order: "asc",
      saveSearch: true,
      excludeManager: false,
      perimeterAgencies: [],
      perimeterDynamic: [],
      resourceStates: [],
      resourceTypes: [],
      returnMoreData: undefined,
      viewMode: "list",
    };

    const response = await getPayrolls(params);

    // testing the format of response data
    expect(response).toHaveProperty("payslips");
    expect(response).toHaveProperty("settings");
    expect(response).toHaveProperty("totalItems");
    expect(response.totalItems).toHaveProperty("rows");

    // testing the content of payslips
    const payslip: Payslip = response.payslips[0];
    expect(payslip.id).toBe("16130");
    expect(payslip.firstName).toBe("EMILIE");
    expect(payslip.lastName).toBe("CASTIONI");
    expect(payslip.contracts).toHaveLength(1);
    expect(payslip.advantagePayList).toHaveLength(1);
    expect(payslip.advantagePayList[0]).toBeNull();
    expect(payslip.currentTimesreports).toHaveLength(0);
    expect(payslip.deliveries).toHaveLength(0);
    expect(payslip.projects).toHaveLength(0);
    expect(payslip.expenses).toHaveLength(4);

    // testing the content of totolItems
    expect(response.totalItems.rows).toBe(788);

    // testing the format of settings
    expect(response.settings).toHaveProperty("contractTypes");
    expect(response.settings).toHaveProperty("currencyTypes");
    expect(response.settings).toHaveProperty("projectTypes");
  });
});
