'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, CheckCircle, AlertCircle, Play, ChevronDown } from 'lucide-react'

interface InterviewPageProps {
  params: {
    id: string
  }
}

export default function InterviewPage({ params }: InterviewPageProps) {
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [code, setCode] = useState(`function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`)
  const [testResults, setTestResults] = useState<any>(null)
  const [showResults, setShowResults] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Binary Search Implementation</h1>
          <p style={{ color: 'hsl(var(--muted-foreground))' }} className="text-sm">
            Implement an efficient binary search algorithm
          </p>
        </div>
        <div className="text-right">
          <Badge className="bg-yellow-600 text-white mb-2 block">Medium</Badge>
          <p className="text-sm font-mono" style={{ color: 'hsl(var(--primary))' }}>
            {formatTime(timeLeft)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">Problem Description</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Task</h3>
              <p style={{ color: 'hsl(var(--muted-foreground))' }} className="text-sm leading-relaxed">
                Implement a binary search algorithm that finds a target value in a sorted array and returns its index. If the target is not found, return -1.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Constraints</h3>
              <ul className="text-sm space-y-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <li>• Array length: 1 ≤ n ≤ 10^5</li>
                <li>• Time Complexity: O(log n)</li>
                <li>• Space Complexity: O(1)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Example</h3>
              <div className="bg-black/20 p-3 rounded-md font-mono text-xs" style={{ color: 'hsl(var(--primary))' }}>
                <p>Input: arr = [1, 3, 5, 7, 9], target = 7</p>
                <p>Output: 3</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Code Editor */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">Code Editor</h2>
            </CardHeader>
            <CardBody className="space-y-3">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-48 p-3 rounded-lg font-mono text-sm border"
                style={{
                  backgroundColor: 'hsl(var(--input))',
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              />
              <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                <Play size={18} />
                Run Tests
              </Button>
            </CardBody>
          </Card>

          {/* Test Results */}
          {showResults && (
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold">Test Results</h2>
              </CardHeader>
              <CardBody className="space-y-3">
                {[
                  { name: 'Basic Search', passed: true },
                  { name: 'Edge Cases', passed: true },
                  { name: 'Performance', passed: false },
                ].map((test) => (
                  <div
                    key={test.name}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ backgroundColor: 'hsl(var(--input))' }}
                  >
                    {test.passed ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <AlertCircle size={20} className="text-yellow-500" />
                    )}
                    <span className="text-sm font-medium">{test.name}</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button variant="primary" size="lg" className="w-full">
        Submit Solution
      </Button>
    </div>
  )
}
