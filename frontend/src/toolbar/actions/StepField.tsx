import React from 'react'
import { Checkbox, Form, Input } from 'antd'
import { SelectorCount } from '~/toolbar/actions/SelectorCount'
import { cssEscape } from 'lib/utils/cssEscape'
import { UrlMatchingToggle } from '~/toolbar/actions/UrlMatchingToggle'
import { ActionStepForm } from '~/toolbar/types'

interface StepFieldProps {
    item: 'href' | 'text' | 'selector' | 'url'
    step: ActionStepForm
    label: string | JSX.Element
    field: { name: number; fieldKey: number; key: number }
}

export function StepField({ field, step, item, label }: StepFieldProps): JSX.Element {
    const selected = step && ((step as any)[`${item}_selected`] as boolean)
    const fieldStyle = selected ? {} : { opacity: 0.5 }

    return (
        <div className={selected ? 'action-field action-field-selected' : 'action-field'}>
            <Form.Item style={{ margin: 0 }}>
                {item === 'href' && step?.href && <SelectorCount selector={`a[href="${cssEscape(step.href)}"]`} />}
                {item === 'selector' && step?.selector && <SelectorCount selector={step.selector} />}

                <Form.Item
                    name={[field.name, `${item}_selected`]}
                    fieldKey={([field.fieldKey, `${item}_selected`] as unknown) as number}
                    valuePropName="checked"
                    noStyle
                >
                    <Checkbox>{label}</Checkbox>
                </Form.Item>
            </Form.Item>
            {item === 'url' ? (
                <Form.Item
                    name={[field.name, `${item}_matching`]}
                    fieldKey={([field.fieldKey, `${item}_matching`] as unknown) as number}
                >
                    <UrlMatchingToggle style={fieldStyle} />
                </Form.Item>
            ) : null}
            <Form.Item name={[field.name, item]} fieldKey={([field.fieldKey, item] as unknown) as number}>
                {item === 'selector' ? <Input.TextArea autoSize style={fieldStyle} /> : <Input style={fieldStyle} />}
            </Form.Item>
        </div>
    )
}
