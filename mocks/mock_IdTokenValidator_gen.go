// Code generated by mockery v2.40.1. DO NOT EDIT.

package mpmocks

import (
	context "context"

	mock "github.com/stretchr/testify/mock"
	idtoken "google.golang.org/api/idtoken"
)

// MockIdTokenValidator is an autogenerated mock type for the IdTokenValidator type
type MockIdTokenValidator struct {
	mock.Mock
}

type MockIdTokenValidator_Expecter struct {
	mock *mock.Mock
}

func (_m *MockIdTokenValidator) EXPECT() *MockIdTokenValidator_Expecter {
	return &MockIdTokenValidator_Expecter{mock: &_m.Mock}
}

// Validate provides a mock function with given fields: ctx, idToken
func (_m *MockIdTokenValidator) Validate(ctx context.Context, idToken string) (*idtoken.Payload, error) {
	ret := _m.Called(ctx, idToken)

	if len(ret) == 0 {
		panic("no return value specified for Validate")
	}

	var r0 *idtoken.Payload
	var r1 error
	if rf, ok := ret.Get(0).(func(context.Context, string) (*idtoken.Payload, error)); ok {
		return rf(ctx, idToken)
	}
	if rf, ok := ret.Get(0).(func(context.Context, string) *idtoken.Payload); ok {
		r0 = rf(ctx, idToken)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(*idtoken.Payload)
		}
	}

	if rf, ok := ret.Get(1).(func(context.Context, string) error); ok {
		r1 = rf(ctx, idToken)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// MockIdTokenValidator_Validate_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'Validate'
type MockIdTokenValidator_Validate_Call struct {
	*mock.Call
}

// Validate is a helper method to define mock.On call
//   - ctx context.Context
//   - idToken string
func (_e *MockIdTokenValidator_Expecter) Validate(ctx interface{}, idToken interface{}) *MockIdTokenValidator_Validate_Call {
	return &MockIdTokenValidator_Validate_Call{Call: _e.mock.On("Validate", ctx, idToken)}
}

func (_c *MockIdTokenValidator_Validate_Call) Run(run func(ctx context.Context, idToken string)) *MockIdTokenValidator_Validate_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run(args[0].(context.Context), args[1].(string))
	})
	return _c
}

func (_c *MockIdTokenValidator_Validate_Call) Return(_a0 *idtoken.Payload, _a1 error) *MockIdTokenValidator_Validate_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *MockIdTokenValidator_Validate_Call) RunAndReturn(run func(context.Context, string) (*idtoken.Payload, error)) *MockIdTokenValidator_Validate_Call {
	_c.Call.Return(run)
	return _c
}

// NewMockIdTokenValidator creates a new instance of MockIdTokenValidator. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewMockIdTokenValidator(t interface {
	mock.TestingT
	Cleanup(func())
}) *MockIdTokenValidator {
	mock := &MockIdTokenValidator{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
