import {Button, Card, Form, Input, message, Select, Space, Upload} from 'antd';
import React, {useState} from 'react';
import {UploadOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {
  genChartByAiAsyncMqUsingPost,
  genChartByAiAsyncUsingPost,
  genChartByAiUsingPost
} from "@/services/mybi/chartController";

const AddChartAsync: React.FC = () => {
  const [form]=Form.useForm();
  const [submitting,setsubmitting]=useState<boolean>(false);


  const onFinish =async (values: any) => {
    //避免重复提交
    if(submitting) {
      return;
    }
    setsubmitting(true);
    const params={
      ...values,
      file:undefined
    }
    try{
      //给后端上传数据
     const res=await genChartByAiAsyncMqUsingPost(params,{},values.file.file.originFileObj)
     if(!res?.data){
       message.error("分析失败");
     }else{
       message.success("分析提交成功，请稍后在我的图表查看");
       form.resetFields();
     }
    }catch(e:any){
      message.error("分析失败"+e.message);
    }
    setsubmitting(false);
  };

  return (
    <div className="add-chart-async">
          <Card title="智能分析">
            <Form name="addChartAsync"
                  form={form}
                  labelAlign="left"
                  onFinish={onFinish}
                  labelCol={{span: 4}}
                  wrapperCol={{span: 16}}
                  initialValues={{}}
            >
              <Form.Item name="goal" label="分析目标"  rules={[{ required: true, message: '请输入分析目标!' }]}>
                <TextArea placeholder="请输入分析需求，比如：分析网站用户的增长情况" />
              </Form.Item>
              <Form.Item name="name" label="图表名称">
                <Input placeholder="请输入图表名称" />
              </Form.Item>
              <Form.Item
                name="chartType"
                label="图表类型"
              >
                <Select placeholder="请选择图表类型"  options={[
                  { value: '折线图', label: '折线图' },
                  { value: '柱状图', label: '柱状图' },
                  { value: '堆叠图', label: '堆叠图' },
                  { value: '饼图', label: '饼图'},
                  { value: '雷达图', label: '雷达图'},
                ]}>
                </Select>
              </Form.Item>

              <Form.Item
                name="file"
                label="原始数据"
              >
                <Upload name="file" maxCount={1}>
                  <Button icon={<UploadOutlined />}>上传文件</Button>
                </Upload>
              </Form.Item>
              <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={submitting} disabled={submitting}>
                    智能分析
                  </Button>
                  <Button htmlType="reset">重置</Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
    </div>
  );
};
export default AddChartAsync;
