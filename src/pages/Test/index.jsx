import { useState } from 'react';
import { ActionSheet } from '@capacitor/action-sheet';
import { Clipboard } from '@capacitor/clipboard';
import { Device } from '@capacitor/device';
import { Dialog } from '@capacitor/dialog';
import { Filesystem } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics } from '@capacitor/haptics';
import { Network } from '@capacitor/network';
import { Toast } from '@capacitor/toast';
import { Camera } from '@capacitor/camera';
import { App } from '@capacitor/app';



const Test = () => {
  const [result, setResult] = useState('');
  const [selectedApi, setSelectedApi] = useState('');

  // 显示结果的函数
  const showResult = (title, data) => {
    setResult(JSON.stringify(data, null, 2));
    console.log(title, data);
  };

  // 测试 Action Sheet
  const testActionSheet = async () => {
    const result = await ActionSheet.showActions({
      title: 'Action Sheet 测试',
      message: '选择一个选项',
      options: [
        { title: '选项 1' },
        { title: '选项 2' },
        { title: '选项 3' },
        { title: '取消', style: 'cancel' }
      ]
    });
    showResult('Action Sheet 结果', result);
  };

  // 测试 App 信息
  const testAppInfo = async () => {
    const info = await App.getInfo();
    showResult('App 信息', info);
  };

  // 测试相机
  const testCamera = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: 'uri'
      });
      showResult('相机结果', {
        webPath: image.webPath,
        format: image.format
      });
    } catch (e) {
      showResult('相机错误', { error: e.message });
    }
  };

  // 测试剪贴板
  const testClipboard = async () => {
    await Clipboard.write({
      string: "这是复制到剪贴板的文本"
    });
    const result = await Clipboard.read();
    showResult('剪贴板内容', result);
  };

  // 测试设备信息
  const testDevice = async () => {
    const info = await Device.getInfo();
    showResult('设备信息', info);
  };

  // 测试对话框
  const testDialog = async () => {
    const { value } = await Dialog.prompt({
      title: '输入测试',
      message: '请输入一些文本',
      okButtonTitle: '确定',
      cancelButtonTitle: '取消'
    });
    showResult('对话框结果', { value });
  };

  // 测试文件系统
  const testFilesystem = async () => {
    try {
      // 写入文件
      await Filesystem.writeFile({
        path: 'test.txt',
        data: '这是测试文件内容',
        directory: 'CACHE',
        encoding: 'utf8'
      });
      
      // 读取文件
      const contents = await Filesystem.readFile({
        path: 'test.txt',
        directory: 'CACHE',
        encoding: 'utf8'
      });
      
      showResult('文件系统测试', contents);
    } catch (e) {
      showResult('文件系统错误', { error: e.message });
    }
  };

  // 测试地理位置
  const testGeolocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      showResult('地理位置', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      });
    } catch (e) {
      showResult('地理位置错误', { error: e.message });
    }
  };

  // 测试触觉反馈
  const testHaptics = async () => {
    await Haptics.vibrate();
    showResult('触觉反馈', { status: '已触发振动' });
  };

  // 测试网络状态
  const testNetwork = async () => {
    const status = await Network.getStatus();
    showResult('网络状态', status);
  };

  // 测试 Toast
  const testToast = async () => {
    await Toast.show({
      text: '这是一条 Toast 消息',
      duration: 'long',
      position: 'center',
    });
    showResult('Toast', { status: '已显示 Toast' });
  };

  // API 列表
  const apiList = [
    { id: 'actionSheet', name: 'Action Sheet', handler: testActionSheet },
    { id: 'appInfo', name: 'App 信息', handler: testAppInfo },
    { id: 'camera', name: '相机', handler: testCamera },
    { id: 'clipboard', name: '剪贴板', handler: testClipboard },
    { id: 'device', name: '设备信息', handler: testDevice },
    { id: 'dialog', name: '对话框', handler: testDialog },
    { id: 'filesystem', name: '文件系统', handler: testFilesystem },
    { id: 'geolocation', name: '地理位置', handler: testGeolocation },
    { id: 'haptics', name: '触觉反馈', handler: testHaptics },
    { id: 'network', name: '网络状态', handler: testNetwork },
    { id: 'toast', name: 'Toast 提示', handler: testToast }
  ];

  return (
    <div className="pb-16 pt-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-bold">Capacitor API 测试</h1>
        <p className="text-gray-500">选择一个 API 进行测试</p>
      </div>

      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-3">
          {apiList.map((api) => (
            <button
              key={api.id}
              className={`p-3 rounded-lg border ${
                selectedApi === api.id 
                  ? 'bg-blue-100 border-blue-500 text-blue-700' 
                  : 'border-gray-300 text-gray-700'
              }`}
              onClick={() => {
                setSelectedApi(api.id);
                api.handler();
              }}
            >
              {api.name}
            </button>
          ))}
        </div>
      </div>

      {result && (
        <div className="px-4">
          <h3 className="text-lg font-medium mb-2">测试结果</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm" style={{ maxHeight: '300px' }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Test;
