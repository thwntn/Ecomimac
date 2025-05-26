import { concatPathName, Message, RouteMap, upperFirstLetter } from "@/utils/common"
import { Form, usePost } from "@/utils/hooks"
import { PreviewResponse } from "@/utils/interface/Data"
import Column from "@/app/(components)/column"
import Content from "@/app/(components)/content"
import Description from "@/app/(components)/description"
import Icon from "@/app/(components)/icon"
import Image from "@/app/(components)/image"
import List from "@/app/(components)/list"
import RenderIf from "@/app/(components)/render-if"
import Row from "@/app/(components)/row"
import Title from "@/app/(components)/title"
import Upload from "@/app/(components)/upload"
import { Fragment } from "react"
import { FormData as FormCustom } from "."

interface IProps {
  form: Form<FormCustom>
}

const Excel = (props: IProps) => {
  const createPreview = usePost<PreviewResponse>(
    concatPathName(RouteMap.DATA, RouteMap.PREVIEW)
  )

  const onChangeFile = ([file]: File[]) => {
    //
    //  Summary:
    //      Check file & get data from file
    //
    //  Returns:
    //
    const formRequest = new FormData()
    formRequest.append("formFiles", file)
    createPreview.request(formRequest)

    //
    //  Summary:
    //      Update form
    //
    //  Returns:
    //
    props.form.append("file", file)
  }

  const downTemplate = () =>
    window.open(
      concatPathName(
        process.env.NEXT_PUBLIC_BACKEND,
        RouteMap.TEMPLATE,
        "DataTemplate.xlsx"
      )
    )
  return (
    <Fragment>
      <Column gap={8}>
        <Row justifyBetween>
          <Column>
            <Title>Tải lên dữ liệu</Title>
            <Description>
              Tải lên file chứa dữ liệu cần xử lý. Hệ thống sẽ tự nhận dạng và
              hiển thị bản xem trước.
            </Description>
          </Column>
          <Icon
            reflect={true}
            content="Mẫu tập tin dữ liệu"
            dir="icon/data/template.svg"
            onClick={downTemplate}
          ></Icon>
        </Row>
        <Upload
          error={Message.CAN_NOT_EMPTY}
          validated={props.form.validate.get("file")}
          onChange={onChangeFile}
        ></Upload>

        <RenderIf
          reference={props.form.data.file}
          render={(file) => (
            <div className="bg-gray-100 w-fit flex items-center gap-[8px] p-[8px] rounded-[12px]">
              <div className="flex justify-center items-center w-[48px] aspect-square bg-white rounded-full">
                <Image dir="icon/data/xlsx.svg" width={24} height={24}></Image>
              </div>
              <div>
                <Content>{file.name}</Content>
                <Description>{file.type}</Description>
              </div>
            </div>
          )}
        ></RenderIf>
      </Column>

      <Column gap={16}>
        <RenderIf
          reference={createPreview.response}
          render={(preview) => (
            <Fragment>
              <Column>
                <Title>Xem trước nội dung</Title>
                <Description>
                  Xem trước 5 dòng đầu tiên để đảm bảo file được nhập đúng định
                  dạng.
                </Description>
              </Column>

              <Row padding={16} className="bg-gray-100 rounded-[12px]">
                <RenderIf
                  reference={preview.data}
                  render={(data) => (
                    <List
                      column={preview.schema.map((item) =>
                        upperFirstLetter(item)
                      )}
                      silent
                      items={preview.data}
                      each={(record) => (
                        <Fragment>
                          {preview.schema.map((item, index) => {
                            return (
                              <Content lineClamp={1} key={index}>
                                {record[item]}
                              </Content>
                            )
                          })}
                        </Fragment>
                      )}
                    ></List>
                  )}
                />
              </Row>
            </Fragment>
          )}
        ></RenderIf>
      </Column>
    </Fragment>
  )
}

export default Excel
